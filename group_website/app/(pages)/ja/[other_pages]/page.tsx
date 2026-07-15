import { notFound } from "next/navigation";
import { listSlugs, readMarkdownBySlug } from "@/app/lib/list_markdown_items";
import { MetadataGenerator } from "@/app/lib/metadata";
import type { Metadata } from "next";
type Params = { other_pages: string}; 

export async function generateStaticParams(): Promise<Params[]> {
    const slugs = listSlugs("ja");
    return slugs.map((slug) => ({ other_pages: slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    let title: string;
    let description: string;
    const { other_pages } = await params;
    try {
        const { frontmatter } = await readMarkdownBySlug(other_pages, "ja");
        title = frontmatter.title;
        description = frontmatter.description;
    } catch (error) {
        notFound();
    } 
    return MetadataGenerator(title, description, `/ja/${other_pages}`, "ja");
}

export default async function Pages({ params }: { params: Promise<Params> }) {
    let md: string; 
    const { other_pages } = await params;
    try {
       const { markdown } = await readMarkdownBySlug(other_pages, "ja");
       md = markdown;
    } catch (error) {
        notFound();
    } 
    return (
        <div className="prose m-2 p-2" dangerouslySetInnerHTML={{ __html: md }} />
    )
}
