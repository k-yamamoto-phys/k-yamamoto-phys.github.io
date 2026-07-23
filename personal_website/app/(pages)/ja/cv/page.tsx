import type { ResolvingMetadata, Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import cv_ja from "@/personal/cv_ja.md"
import { convertMarkdownToHtml } from "@/app/lib/markdown";
import { FiExternalLink } from "react-icons/fi";
export async function generateMetadata(): Promise<Metadata> {   
    return MetadataGenerator(`CV(日本語)`, `山本和樹の履歴`, '/ja/cv' ); 
}

export default async function Page() {
    const htmlContent = await convertMarkdownToHtml(cv_ja as string);

    return (
        <div className="m-2 p-2 prose">
            <h1>プロフィール</h1>
            <ul className="publication-profile-links not-prose" aria-label="外部プロフィール">
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
