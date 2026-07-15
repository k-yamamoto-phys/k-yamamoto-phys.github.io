import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 3000);
const basePath = process.env.NEXT_PUBLIC_GROUP_BASE_PATH ?? "";
const normalizedBasePath = basePath.trim().replace(/^\/+|\/+$/g, "");
const baseURL = process.env.PLAYWRIGHT_BASE_URL
  ?? `http://127.0.0.1:${port}${normalizedBasePath ? `/${normalizedBasePath}/` : "/"}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `PORT=${port} npm run dev`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1200 },
      },
    },
    {
      name: "chromium-mobile",
      use: {
        ...devices["Pixel 7"],
      },
    },
  ],
});
