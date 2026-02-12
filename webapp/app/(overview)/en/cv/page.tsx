import type { ResolvingMetadata, Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import cv_en from "@/personal/cv_en.md"
import { convertMarkdownToHtml } from "@/app/lib/markdown";
export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`CV`, `CV for Dr. Kazuki Yamamoto`);
}

export default async function Page() {
    const htmlContent = await convertMarkdownToHtml(cv_en as string);
    return (
        <div className="m-2 p-2 prose">
            <div dangerouslySetInnerHTML={{ __html: htmlContent || "<p>Error loading content.</p>" }} />
        </div>
    );
}