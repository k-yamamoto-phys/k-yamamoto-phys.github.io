import type { ResolvingMetadata, Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import research_en from "@/personal/research_en.md"
import { convertMarkdownToHtmlWithSectionize, convertMarkdownToHtml } from "@/app/lib/markdown";
export async function generateMetadata(): Promise<Metadata> {   
    return MetadataGenerator(`Research`, `Research interests and projects of Dr. Kazuki Yamamoto`, '/research'); 
}

export default async function Page() {
    const htmlContent = await convertMarkdownToHtml(research_en as string);
    return (
        <div className="m-2 p-2 prose">
            <div dangerouslySetInnerHTML={{ __html: htmlContent || "<p>Error loading content.</p>" }} />
        </div>
    );
}