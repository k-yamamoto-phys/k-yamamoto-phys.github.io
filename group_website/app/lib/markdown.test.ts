import { describe, expect, it } from "vitest";
import { convertMarkdownToHtml, convertMarkdownToHtmlWithSectionize } from "./markdown";

describe("convertMarkdownToHtml", () => {
    it("decorates h3 headings with the expected classes", async () => {
        const html = await convertMarkdownToHtml("### Heading");
        expect(html).toContain('class="my-2 p-1 border-l-4 border-primary pl-2"');
    });

    it("adds target and rel attributes for external links", async () => {
        const html = await convertMarkdownToHtml("[link](https://example.com)");
        expect(html).toContain('target="_blank"');
        expect(html).toContain('rel="nofollow noopener noreferrer"');
    });

    it("wraps images with a caption container and renders the alt text", async () => {
        const html = await convertMarkdownToHtml("![Caption](image.png)");
        expect(html).toContain(
            'class="max-w-3/4 mx-auto not-prose my-4 p-4 bg-white shadow-sm rounded-md"'
        );
        expect(html).toMatch(/<p>Caption<\/p>/);
    });

    it("renders math in image captions using KaTeX", async () => {
        const html = await convertMarkdownToHtml("![$E=mc^2$](image.png)");
        expect(html).toContain("katex");
    });

    it("does not render an undefined caption for empty alt text", async () => {
        const html = await convertMarkdownToHtml("![](image.png)");
        expect(html).not.toContain("undefined");
    });
});

describe("convertMarkdownToHtmlWithSectionize", () => {
    it("wraps sections separated by horizontal rules and alternates background classes", async () => {
        const markdown = [
            "# First",
            "",
            "Alpha",
            "",
            "---",
            "",
            "# Second",
            "",
            "Beta"
        ].join("\n");

        const html = await convertMarkdownToHtmlWithSectionize(markdown);
        const sectionCount = (html.match(/<section/g) || []).length;
        expect(sectionCount).toBe(2);
        expect(html).toContain("bg-gray-50");
        expect(html).toContain("bg-blue-50");
    });

    it("starts section coloring from the first color on each call", async () => {
        const htmlFirst = await convertMarkdownToHtmlWithSectionize("# First");
        const htmlSecond = await convertMarkdownToHtmlWithSectionize("# Second");
        expect(htmlFirst).toContain("bg-gray-50");
        expect(htmlSecond).toContain("bg-gray-50");
    });
});
