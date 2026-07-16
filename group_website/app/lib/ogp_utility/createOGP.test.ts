import { describe, expect, it } from "vitest";
import { resolvePageTitle } from "./createOGP";

describe("resolvePageTitle", () => {
    it("uses a supplied page title", () => {
        expect(resolvePageTitle("  Publications  ", "/publications", "en"))
            .toBe("Publications");
    });

    it("derives an English title from the route", () => {
        expect(resolvePageTitle("", "/research", "en")).toBe("Research");
    });

    it("uses the Japanese page name when frontmatter has no title", () => {
        expect(resolvePageTitle("", "/ja/project", "ja")).toBe("プロジェクト");
    });
});
