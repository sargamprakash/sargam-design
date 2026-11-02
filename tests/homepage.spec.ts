import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { sampleProjects } from "./fixtures";
import { publishedProjects } from "../src/lib/projects";

async function showProjects(page: Page, count: 0 | 1 | 6) {
  const html = await readFile(
    new URL(`../.test-fixtures/collection-${count}.html`, import.meta.url),
    "utf8",
  );
  await page.getByRole("region", { name: "Projects", exact: true }).evaluate(
    (element, markup) => { element.outerHTML = markup; },
    html,
  );
}

test("launches with the real health tool and no fixture projects or fake controls", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.protocol.startsWith("http") && url.hostname !== "127.0.0.1") {
      external.push(request.url());
    }
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("My little toolkit.");
  await expect(page.getByRole("heading", { name: "Nothing here just yet." })).toHaveCount(0);
  await expect(page.locator(".project-shortcut")).toHaveCount(publishedProjects.length);
  const health = page.getByRole("link", { name: "Health reports", exact: true });
  await expect(health).toHaveAttribute("href", "https://health.sargam.design/");
  await expect(health.locator("img")).toHaveAttribute("src", "/icons/health-reports.svg");
  await expect(health.locator("source")).toHaveAttribute("srcset", "/icons/health-reports-dark.svg");
  for (const fixture of sampleProjects) {
    await expect(page.getByRole("link", { name: fixture.name, exact: true })).toHaveCount(0);
  }
  await expect(page.getByRole("button")).toHaveCount(0);
  await expect(page.locator("input")).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  expect(external).toEqual([]);
});

for (const appearance of ["light", "dark"] as const) {
  test(`${appearance} appearance follows the system with accessible structure`, async ({ page }, testInfo) => {
    await page.emulateMedia({ colorScheme: appearance });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("body")).toHaveCSS(
      "background-color",
      appearance === "dark" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
    );
    await expect(page.locator(appearance === "dark" ? ".mark-dark" : ".mark-light")).not.toHaveCSS("display", "none");
    await expect(page.locator(appearance === "dark" ? ".mark-light" : ".mark-dark")).toHaveCSS("display", "none");
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`home-${appearance}.png`),
      fullPage: true,
      scale: "css",
    });
  });
}

test("public metadata, brand assets, and the sitemap are portable", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("My little toolkit | sargam.design");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/sargam\.design\/?$/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://sargam.design/social-preview.png");
  for (const path of ["/social-preview.png", "/favicon.ico", "/apple-touch-icon.png", "/brand/monogram-black.svg", "/brand/monogram-white.svg", "/icons/health-reports.svg", "/icons/health-reports-dark.svg"]) {
    expect((await request.get(path)).status()).toBe(200);
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap.match(/<loc>/g)).toHaveLength(1);
  expect(sitemap).toContain("https://sargam.design/");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Allow: /");
  expect(robots).not.toContain("Disallow: /");
});

test("keyboard users can skip directly to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("one and six source-rendered shortcuts keep order and real link semantics", async ({ page }, testInfo) => {
  await page.goto("/");
  await showProjects(page, 0);
  await expect(page.getByRole("heading", { name: "Nothing here just yet." })).toBeVisible();
  await showProjects(page, 1);
  await expect(page.locator(".project-shortcut")).toHaveCount(1);
  await expect(page.getByText("Nothing here just yet.")).toHaveCount(0);
  await showProjects(page, 6);
  await expect(page.locator(".project-name")).toHaveText(sampleProjects.map((project) => project.name));
  await expect(page.locator(".project-shortcut").first()).toHaveAttribute("href", "/example-one/");
  await expect(page.locator(".project-shortcut[target]")).toHaveCount(0);
  const columns = await page.locator(".project-grid").evaluate(
    (element) => getComputedStyle(element).gridTemplateColumns.split(" ").length,
  );
  expect(columns).toBe(testInfo.project.name === "iphone" ? 2 : 4);
  for (const shortcut of await page.locator(".project-shortcut").all()) {
    const box = await shortcut.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  for (const appearance of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: appearance });
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  }
  await page.screenshot({
    path: testInfo.outputPath("populated-grid.png"),
    fullPage: true,
    scale: "css",
  });
  await page.reload();
  await expect(page.locator(".project-shortcut")).toHaveCount(publishedProjects.length);
  await expect(page.getByRole("link", { name: "Health reports", exact: true })).toBeVisible();
});

test("narrow screens, long names, and enlarged text do not overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/");
  await showProjects(page, 6);
  const noOverflow = () => page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
  );
  expect(await noOverflow()).toBe(true);
  await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
  expect(await noOverflow()).toBe(true);
});

test("reduced motion removes icon transforms without hiding focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await showProjects(page, 6);
  const shortcut = page.locator(".project-shortcut").first();
  await shortcut.focus();
  await expect(shortcut).toHaveCSS("outline-style", "solid");
  await expect(shortcut.locator(".project-icon")).toHaveCSS("transition-duration", "0s");
  await shortcut.hover();
  await expect(shortcut.locator(".project-icon")).toHaveCSS("transform", "none");
});

test("an unknown URL is an actual 404 with a useful home link", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page isn't here.");
  await page.getByRole("link", { name: "Back to projects" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("My little toolkit.");
});
