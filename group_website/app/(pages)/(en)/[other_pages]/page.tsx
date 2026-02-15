import { notFound } from "next/navigation";
import { listSlugs, readMarkdownBySlug, MarkdownItem } from "@/app/lib/list_markdown_items";
import { MetadataGenerator } from "@/app/lib/metadata";
import type { ResolvingMetadata, Metadata } from "next";
type Params = { other_pages: string };

export async function generateStaticParams(): Promise<Params[]> {
    const slugs = listSlugs("en");
    console.log("Generated slugs for other_pages:", slugs);
    return slugs.map((slug) => ({ other_pages: slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    let title: string;
    let description: string;
    const { other_pages } = await params;
    console.log("Fetching markdown for slug:", other_pages);
    try {
        const { frontmatter } = await readMarkdownBySlug(other_pages, "en");
        title = frontmatter.title;
        description = frontmatter.description;
    } catch (error) {
        notFound();
    }
    return MetadataGenerator(title, description, `/${other_pages}`, "en");
}

export default async function Pages({ params }: { params: Promise<Params> }) {
    let md: string;
    const { other_pages } = await params;
    console.log("Fetching markdown for slug:", other_pages);
    try {
        const { markdown } = await readMarkdownBySlug(other_pages, "en");
        md = markdown;
    } catch (error) {
        notFound();
    }
    return (
        <div className="">
            <div className="prose m-2 p-2" dangerouslySetInnerHTML={{ __html: md }} />
        </div>
    )
}
