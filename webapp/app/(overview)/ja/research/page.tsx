import type { ResolvingMetadata, Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import research_ja from "@/personal/research_ja.md"
import { convertMarkdownToHtmlWithSectionize } from "@/app/lib/markdown";
export async function generateMetadata(): Promise<Metadata> {   
    return MetadataGenerator(`研究`, `研究の興味とプロジェクト`); 
}

export default async function Page() {
    const htmlContent = await convertMarkdownToHtmlWithSectionize(research_ja as string);
    return (
        <div className=" prose">
            <div dangerouslySetInnerHTML={{ __html: htmlContent || "<p>Error loading content.</p>" }} />
        </div>
    );
}