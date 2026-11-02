import { copyFile, lstat, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = join(root, "out");
const vercelDirectory = join(root, ".vercel");
const output = join(vercelDirectory, "output");
const destination = join(output, "static");

async function requireRealDirectory(path, optional = false) {
  let entry;
  try {
    entry = await lstat(path);
  } catch (error) {
    if (optional && error instanceof Error && "code" in error && error.code === "ENOENT") return;
    throw error;
  }
  if (!entry.isDirectory() || entry.isSymbolicLink()) {
    throw new Error(`Expected an ordinary directory: ${path}`);
  }
}

async function filesWithin(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink() || entry.name.startsWith(".")) {
      throw new Error(`Refusing to package a hidden file or symlink: ${path}`);
    }
    if (entry.isDirectory()) {
      files.push(...await filesWithin(path));
    } else if (entry.isFile()) {
      files.push(path);
    } else {
      throw new Error(`Unsupported export entry: ${path}`);
    }
  }
  return files;
}

await requireRealDirectory(source);
const files = await filesWithin(source);
const names = files.map((path) => relative(source, path).split("\\").join("/"));
if (!names.includes("index.html") || !names.includes("404.html")) {
  throw new Error("Build the static homepage before preparing its deployment.");
}
await requireRealDirectory(vercelDirectory, true);
await mkdir(vercelDirectory, { recursive: true });
await requireRealDirectory(output, true);

// Replace only this generated build-output subtree; preserve project linkage.
await rm(output, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (let index = 0; index < files.length; index++) {
  const target = join(destination, names[index]);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(files[index], target);
}

const overrides = Object.fromEntries(
  names
    .filter((name) => basename(name) === "index.txt" || /^__next\..*\.txt$/.test(basename(name)))
    .map((name) => [name, { contentType: "text/x-component" }]),
);
const config = {
  version: 3,
  routes: [
    { src: "^/$", dest: "/index.html" },
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/404.html", status: 404 },
  ],
  overrides,
  framework: { version: "16.3.4" },
};
await writeFile(join(output, "config.json"), `${JSON.stringify(config, null, 2)}\n`);
console.log(`Prepared ${files.length} static files in .vercel/output; no build or package fetch was run.`);
