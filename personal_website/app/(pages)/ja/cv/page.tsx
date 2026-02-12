import type { ResolvingMetadata, Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import cv_ja from "@/personal/cv_ja.md"
import { convertMarkdownToHtml } from "@/app/lib/markdown";
export async function generateMetadata(): Promise<Metadata> {   
    return MetadataGenerator(`CV(日本語)`, `山本和樹の履歴`); 
}

export default async function Page() {
    const htmlContent = await convertMarkdownToHtml(cv_ja as string);
    return (
        <div className="m-2 p-2 prose">
            <div dangerouslySetInnerHTML={{ __html: htmlContent || "<p>Error loading content.</p>" }} />
        </div>
    );
}