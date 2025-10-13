import type { ResolvingMetadata, Metadata } from "next";
import { loadMarkdown } from "@/app/lib/file-loader";
import { MetadataGenerator } from "@/app/lib/metadata";
export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {   
    return MetadataGenerator(`Research`, `Research interests and projects of Dr. Kazuki Yamamoto`); 
}

export default async function Page() {
    const markdownContent = await loadMarkdown('app/site_data/research_en.md'); 
    return (
        <div className="m-2 p-2 prose">
            <div dangerouslySetInnerHTML={{ __html: markdownContent || "<p>Error loading content.</p>" }} />
        </div>
    );
}