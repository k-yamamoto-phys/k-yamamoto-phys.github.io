import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

const pages = [
  { name: "home-en", path: "." },
  { name: "home-ja", path: "ja" },
  { name: "members-en", path: "members" },
  { name: "members-ja", path: "ja/members" },
];

test.describe("visual inspection screenshots", () => {
  for (const pageInfo of pages) {
    test(`${pageInfo.name} screenshot`, async ({ page }, testInfo) => {
      await page.goto(pageInfo.path);
      await page.waitForLoadState("networkidle");
      await expect(
        page.getByRole("heading", { name: /404|not found|見つかりませんでした/i }),
      ).toHaveCount(0);

      const outputDir = path.join(
        testInfo.config.rootDir,
        "visual-screenshots",
        testInfo.project.name,
      );
      await mkdir(outputDir, { recursive: true });

      await page.screenshot({
        path: path.join(outputDir, `${pageInfo.name}.png`),
        fullPage: true,
      });
    });
  }
});
