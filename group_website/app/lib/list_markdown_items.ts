import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { convertMarkdownToHtml } from "./markdown";
export type MarkdownItem = {
    frontmatter: {
        title: string;
        description: string;
    }
    markdown: string;
}
const CONTENT_DIR = path.join(process.cwd(), "../", "site_data", "group", "markdown_pages");
export function listSlugs(lang: "ja" | "en"): string[] {
    return fs
        .readdirSync(path.join(CONTENT_DIR, lang))
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(/\.md$/, ""));
}

export async function readMarkdownBySlug(slug: string, lang: "ja" | "en"): Promise<MarkdownItem> {
    const filePath = path.join(CONTENT_DIR, lang, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Markdown not found for slug="${slug}"`);
    }
    const content = await fs.promises.readFile(filePath, "utf8");
    const { content: markdown_content, data: frontMatter } = matter(content);
    const htmlContent = await convertMarkdownToHtml(markdown_content);
    return { frontmatter: {
        title: frontMatter.title as string || "",
        description: frontMatter.description as string || "",
    }, markdown: htmlContent };
}
