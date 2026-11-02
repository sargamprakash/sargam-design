import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 2,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:49388",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node node_modules/http-server/bin/http-server out -a 127.0.0.1 -p 49388 -c-1 --no-dotfiles -s",
    url: "http://127.0.0.1:49388",
    reuseExistingServer: false,
  },
  projects: [
    { name: "logic", testMatch: "registry.spec.ts" },
    {
      name: "desktop",
      testMatch: "homepage.spec.ts",
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "iphone",
      testMatch: "homepage.spec.ts",
      use: {
        ...devices["iPhone 13"],
        browserName: "webkit",
      },
    },
  ],
});
