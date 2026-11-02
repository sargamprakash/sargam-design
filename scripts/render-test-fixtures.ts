import { mkdir, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ProjectCollection } from "../src/components/project-collection";
import { sampleProjects } from "../tests/fixtures";

const directory = new URL("../.test-fixtures/", import.meta.url);
await mkdir(directory, { recursive: true });

for (const count of [0, 1, 6]) {
  const html = renderToStaticMarkup(
    createElement(ProjectCollection, { projects: sampleProjects.slice(0, count) }),
  );
  await writeFile(new URL(`collection-${count}.html`, directory), html);
}

console.log("Rendered test-only collection fixtures from the real React components.");
