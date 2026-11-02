import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { defineProjects, projectInitials, publishedProjects } from "../src/lib/projects";
import { publicSitemapUrls } from "../src/lib/public-sitemap";
import { validateProjectAssets } from "../scripts/validate-project-assets.mjs";
import { exampleProject, sampleProjects } from "./fixtures";

test("the published registry includes the real private health app and its themed icon", () => {
  expect(publishedProjects).toContainEqual({
    id: "health-reports",
    name: "Health reports",
    href: "https://health.sargam.design/",
    tone: "cobalt",
    icon: {
      src: "/icons/health-reports.svg",
      darkSrc: "/icons/health-reports-dark.svg",
    },
    publicSummary: "A private family health-record archive.",
  });
  expect(() => validateProjectAssets(publishedProjects)).not.toThrow();
});

test("server-renders zero, one, and six projects without publishing fixtures", async () => {
  for (const count of [0, 1, 6]) {
    const html = await readFile(
      new URL(`../.test-fixtures/collection-${count}.html`, import.meta.url),
      "utf8",
    );
    expect((html.match(/class="project-shortcut"/g) ?? []).length).toBe(count);
    expect(html.includes("Nothing here just yet.")).toBe(count === 0);
  }
  const publishedIds = new Set<string>(publishedProjects.map((project) => project.id));
  expect(sampleProjects.some((project) => publishedIds.has(project.id))).toBe(false);
});

test("keeps the authored order and supports independent HTTPS projects", () => {
  const projects = defineProjects([
    exampleProject({ id: "second", href: "https://tool.example.org/" }),
    exampleProject({ id: "first" }),
  ]);
  expect(projects.map((project) => project.id)).toEqual(["second", "first"]);
});

test("rejects duplicate ids, empty names, and ambiguous URLs", () => {
  expect(() => defineProjects([exampleProject(), exampleProject()])).toThrow("Duplicate project id");
  expect(() => defineProjects([exampleProject({ name: " " })])).toThrow("needs a name");
  expect(() => defineProjects([exampleProject({ href: "//other.example/" })])).toThrow("destination");
  expect(() => defineProjects([exampleProject({ href: "/\\other.example/" })])).toThrow("destination");
  expect(() => defineProjects([exampleProject({ href: "https://user@example.org/" })])).toThrow("credentials");
});

test("initials preserve complete graphemes", () => {
  expect(projectInitials("Example project")).toBe("EP");
  expect(projectInitials("One")).toBe("O");
  expect(projectInitials("\uD83C\uDDEE\uD83C\uDDF3 Trip")).toBe("\uD83C\uDDEE\uD83C\uDDF3T");
  expect(() => projectInitials(" ")).toThrow("empty name");
});

test("declared icons must exist; omitted icons use the intended initials path", () => {
  expect(() => validateProjectAssets(sampleProjects)).not.toThrow();
  expect(() => validateProjectAssets([
    exampleProject({ icon: { src: "/__missing_test_icon__.svg" } }),
  ])).toThrow("icon is missing");
});

test("the sitemap contains only unique public URLs owned by this host", () => {
  expect(publicSitemapUrls(publishedProjects)).toEqual(["https://sargam.design/"]);
  expect(publicSitemapUrls([
    exampleProject({ href: "/one/#section" }),
    exampleProject({ id: "duplicate-url", href: "/one/" }),
    exampleProject({ id: "independent", href: "https://tool.example.org/" }),
  ])).toEqual(["https://sargam.design/", "https://sargam.design/one/"]);
});
