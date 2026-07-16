import { MetadataGenerator } from "@/app/lib/metadata";
import type { Metadata } from "next";
import { convertMarkdownToHtml } from "@/app/lib/markdown";
import md_content from "@/group/research_ja.md";
import { PressReleases } from "@/app/ui/server/press_release";

export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`研究内容`, `山本研究室の研究紹介`, '/research', "en");
}

export default async function Pages() {
    const htmlContent = (await convertMarkdownToHtml(md_content as string)).replace(
        "<h2>研究の詳細</h2>",
        '<h2 id="research-details" class="scroll-mt-28">研究の詳細</h2>',
    );
    return (
        <div className="mt-3">
            <div className="prose mx-2 px-2"><h1>研究</h1></div>
            <nav className="not-prose mx-4 mb-8 flex flex-wrap gap-3" aria-label="研究ページ内メニュー">
                <a href="#press-releases" className="btn btn-outline btn-primary">
                    プレスリリース
                </a>
                <a href="#research-details" className="btn btn-outline btn-primary">
                    研究
                </a>
            </nav>
            <section id="research" className="scroll-mt-28">
                <div className="prose m-2 p-2" dangerouslySetInnerHTML={{ __html: htmlContent || "" }} />
            </section>
            <section id="press-releases" className="prose m-2 scroll-mt-28 p-2">
                <h2>プレスリリース</h2>
                <PressReleases lang="ja" />
            </section>
        </div>
    )
}
