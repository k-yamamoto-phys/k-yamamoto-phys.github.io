
import { MetadataGenerator } from "@/app/lib/metadata";
import type { Metadata } from "next";
import { convertMarkdownToHtml } from "@/app/lib/markdown";
import md_content from "@/group/research_en.md";
import { PressReleases } from "@/app/ui/server/press_release";
import { IoIosArrowDown } from "react-icons/io";
export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`Research`, `introductions of the research  in Yamamoto group`, '/research', "en");
}

export default async function Pages() {
    const htmlContent = (await convertMarkdownToHtml(md_content as string)).replace(
        "<h2>Research details</h2>",
        '<h2 id="research-details" class="scroll-mt-28">Research details</h2>',
    );
    return (
        <div className="mt-3">
            <div className="prose mx-2 px-2"><h1>Research</h1></div>
            <nav className="not-prose mx-4 mb-8 flex flex-wrap gap-3" aria-label="Research page sections"><a href="#research-details" className="btn btn-outline btn-primary">
                    Research details
                    <IoIosArrowDown aria-hidden="true" />
                </a>

                <a href="#press-releases" className="btn btn-outline btn-primary">
                    Press releases
                    <IoIosArrowDown aria-hidden="true" />
                </a>
                
            </nav>
            <section id="research" className="scroll-mt-28">
                <div className="prose m-2 p-2" dangerouslySetInnerHTML={{ __html: htmlContent || "" }} />
            </section>
            <section id="press-releases" className="prose m-2 scroll-mt-28 p-2">
                <h2>Press releases</h2>
                <PressReleases lang={`en`} /> 
            </section>
        </div>
    )
}
