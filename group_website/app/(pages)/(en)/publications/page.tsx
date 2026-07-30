import type { ResolvingMetadata, Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import paper_data from "@/group/paper_regular.yml"
import conference_data from "@/group/paper_conference.yml"
import { convertMarkdownToHtml } from "@/app/lib/markdown"
import React from "react";
type Paper = {
    title: string;
    authors: string;
    arXiv?: string;
    year?: number;
    note?: string;
    journal?: {
        name: string;
        url: string;
    };
}
export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`Publications`, `List of academic publications in Yamamoto group`, '/publications', "en");
}

export default async function Page() {
    const regular_paper = paper_data as Paper[];
    const preprints = regular_paper.filter(p => p.journal === null);
    const published_papers = regular_paper.filter(p => p.journal !== null);
    const total_published_count = published_papers.length;
    const published_papers_by_year = Object.entries(
        published_papers.reduce((acc, paper) => {
            const year = paper.year || 'Unknown';
            if (!acc[year]) acc[year] = [];
            acc[year].push(paper);
            return acc;
        }, {} as Record<string | number, Paper[]>)
    ).sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, data]) => ({ year, data }));
    const conference_paper = conference_data as Paper[];
    return (
        <div className="m-2 p-2 prose">
            <h1>Publications</h1>
            {preprints?.length && <h2>Preprints</h2>}
            <ul className="list-none">
                {
                    (preprints ?? []).map((paper, index, array) => (
                        <PaperItem key={index} paper={paper} number={array.length - index + total_published_count} />
                    ))
                }
            </ul>
            {published_papers_by_year?.length && <h2>Original Papers</h2>}
            {
                (published_papers_by_year ?? []).map(({ year, data }, index) => (
                    <React.Fragment key={index}>
                        <h3>{year}</h3>
                        <ul className="list-none">
                            {
                                data.map((paper, index) => (
                                    <PaperItem key={index} paper={paper} number={total_published_count - (published_papers.indexOf(paper))} />
                                ))
                            }
                        </ul>
                    </React.Fragment>))
            }

            {conference_paper?.length  && <h2>Conference Proceedings</h2>}
            <ul className="list-none">
                {(conference_paper ?? []).map((paper, index, array) => (
                    <PaperItem
                        key={index}
                        paper={paper}
                        number={array.length - index}
                    />
                ))}
            </ul>
        </div>
    );
}
async function PaperItem({ paper, number }: { paper: Paper, number: number }) {
    const markdownContent = await convertMarkdownToHtml(paper.title);
    const noteContent = paper.note ? await convertMarkdownToHtml(paper.note) : null;
    return (
        <li className="publication-item">
            <span className="publication-number">{number}.</span>
            <div className="publication-body">
                <div className="publication-title" dangerouslySetInnerHTML={{ __html: markdownContent || "" }} />
                {/* <p><UnderlinedText text={paper.authors} target={`Kazuki Yamamoto`} /></p> */}
                <p className="publication-authors">{paper.authors}</p>
                <p className="publication-links">
                    {paper.journal === null ?
                        (<a href={`https://arxiv.org/abs/${paper.arXiv}`} target="_blank" rel="noopener noreferrer">arXiv:{paper.arXiv}</a>) :
                        (<><a href={paper.journal?.url} target="_blank" rel="noopener noreferrer">{paper.journal?.name}</a>{
                            paper.arXiv && <>{` (`}<a href={`https://arxiv.org/abs/${paper.arXiv}`} target="_blank" rel="noopener noreferrer">arXiv:{paper.arXiv}</a>{`)`}</>
                        }
                        </>)
                    }
                </p>
                {noteContent && <div className="publication-note" dangerouslySetInnerHTML={{ __html: noteContent }} />}
            </div>
        </li>
    );
}
