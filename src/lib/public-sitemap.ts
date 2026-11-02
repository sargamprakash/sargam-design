import type { Project } from "./projects";
import { SITE } from "./site";

export function publicSitemapUrls(projects: readonly Project[]): string[] {
  const urls = new Set<string>([`${SITE.origin}/`]);
  for (const project of projects) {
    const url = new URL(project.href, SITE.origin);
    if (url.origin === SITE.origin) {
      url.hash = "";
      urls.add(url.toString());
    }
  }
  return [...urls];
}
