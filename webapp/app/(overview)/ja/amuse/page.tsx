import type { ResolvingMetadata, Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import amuse from "@/personal/amuse.md"
import { convertMarkdownToHtml } from "@/app/lib/markdown";
export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`徒然なるままに`, `徒然なるままに`);
}

export default async function Page() {
    const htmlContent = await convertMarkdownToHtml(amuse as string);
    return (
        <div className="m-2 p-2 prose">
            <div dangerouslySetInnerHTML={{ __html: htmlContent || "<p>Error loading content.</p>" }} />
        </div>
    );
}