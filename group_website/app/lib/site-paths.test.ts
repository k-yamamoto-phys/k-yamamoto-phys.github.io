import { afterEach, describe, expect, it, vi } from "vitest";
import { siteUrl, withBasePath, withoutBasePath } from "./site-paths";

describe("site path helpers", () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it("uses group as the default export path prefix", () => {
        expect(withBasePath("/members")).toBe("/group/members");
        expect(withoutBasePath("/group/members")).toBe("/members");
    });

    it("normalizes custom export path prefixes", () => {
        vi.stubEnv("NEXT_PUBLIC_GROUP_EXPORT_PATH_PREFIX", "/lab/");
        expect(withBasePath("members")).toBe("/lab/members");
        expect(withoutBasePath("/lab/members")).toBe("/members");
    });

    it("leaves external URLs and anchors untouched", () => {
        expect(withBasePath("https://example.com")).toBe("https://example.com");
        expect(withBasePath("#section")).toBe("#section");
    });

    it("keeps public URLs independent from the export path prefix", () => {
        expect(siteUrl("/group/members")).toMatch(/\/members$/);
        expect(siteUrl("/group/members")).not.toContain("/group/group/members");
    });
});
