import type { ResolvingMetadata, Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import research_en from "@/personal/research_en.md"
import { convertMarkdownToHtmlWithSectionize } from "@/app/lib/markdown";
export async function generateMetadata(): Promise<Metadata> {   
    return MetadataGenerator(`Research`, `Research interests and projects of Dr. Kazuki Yamamoto`); 
}

export default async function Page() {
    const htmlContent = await convertMarkdownToHtmlWithSectionize(research_en as string);
    return (
        <div className="prose">
            <div dangerouslySetInnerHTML={{ __html: htmlContent || "<p>Error loading content.</p>" }} />
        </div>
    );
}