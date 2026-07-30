import type { ResolvingMetadata, Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import cv_en from "@/personal/cv_en.md"
import { convertMarkdownToHtml } from "@/app/lib/markdown";
import { FiExternalLink } from "react-icons/fi";
export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`CV`, `CV for Dr. Kazuki Yamamoto`, '/cv');
}

export default async function Page() {
    const htmlContent = await convertMarkdownToHtml(cv_en as string);

    return (
        <div className="m-2 p-2 prose">
            <h1>Profile</h1>
            <ul className="publication-profile-links not-prose" aria-label="External profiles">
                <li>
                    <a href="https://researchmap.jp/k-yamamoto-physics" target="_blank" rel="noopener noreferrer">
                        <span>researchmap</span>
                        <FiExternalLink aria-hidden="true" />
                    </a>
                </li>
                <li>
                    <a href="https://nrid.nii.ac.jp/ja/nrid/1000000981028/" target="_blank" rel="noopener noreferrer">
                        <span>KAKEN</span>
                        <FiExternalLink aria-hidden="true" />
                    </a>
                </li>
            </ul>
            <div dangerouslySetInnerHTML={{ __html: htmlContent || "<p>Error loading content.</p>" }} />
        </div>
    );
}
