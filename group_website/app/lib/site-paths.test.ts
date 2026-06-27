import { afterEach, describe, expect, it, vi } from "vitest";
import { siteUrl, withBasePath, withoutBasePath } from "./site-paths";

describe("site path helpers", () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it("keeps app paths rooted at slash by default", () => {
        expect(withBasePath("/members")).toBe("/members");
        expect(withBasePath("members")).toBe("/members");
        expect(withoutBasePath("/group/members")).toBe("/group/members");
    });

    it("strips the configured Next.js base path when one is provided", () => {
        vi.stubEnv("NEXT_PUBLIC_GROUP_BASE_PATH", "/lab/");
        expect(withBasePath("members")).toBe("/members");
        expect(withoutBasePath("/lab/members")).toBe("/members");
        expect(withoutBasePath("/lab")).toBe("/");
    });

    it("leaves external URLs and anchors untouched", () => {
        expect(withBasePath("https://example.com")).toBe("https://example.com");
        expect(withBasePath("#section")).toBe("#section");
    });

    it("builds public URLs from logical app paths", () => {
        expect(siteUrl("/members")).toMatch(/\/members$/);
        expect(siteUrl("/members")).not.toContain("/group/group/members");
    });
});
