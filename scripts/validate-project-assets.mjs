import { existsSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { publishedProjects } from "../src/lib/projects.ts";

const publicDirectory = resolve(fileURLToPath(new URL("../public/", import.meta.url)));

/** @param {readonly import("../src/lib/projects.ts").Project[]} projects */
export function validateProjectAssets(projects) {
  for (const project of projects) {
    for (const source of [project.icon?.src, project.icon?.darkSrc]) {
      if (!source) continue;
      const path = resolve(publicDirectory, decodeURIComponent(source).slice(1));
      if (!path.startsWith(`${publicDirectory}${sep}`)) {
        throw new Error(`Project "${project.id}" has an icon outside the public directory.`);
      }
      if (!existsSync(path) || !statSync(path).isFile()) {
        throw new Error(
          `Project "${project.id}" icon is missing: ${source}. Add the asset or omit the icon to use initials.`,
        );
      }
    }
  }
}

validateProjectAssets(publishedProjects);
