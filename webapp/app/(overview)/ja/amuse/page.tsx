import type { ResolvingMetadata, Metadata } from "next";
import { loadMarkdown } from "@/app/lib/file-loader";
import { MetadataGenerator } from "@/app/lib/metadata";

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
    return MetadataGenerator(`徒然なるままに`, `徒然なるままに`);
}

export default async function Page() {
    const markdownContent = await loadMarkdown('app/site_data/amuse.md');
    return (
        <div className="m-2 p-2 prose">
            <div dangerouslySetInnerHTML={{ __html: markdownContent || "<p>Error loading content.</p>" }} />
        </div>
    );
}