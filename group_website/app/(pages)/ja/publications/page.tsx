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
    return MetadataGenerator(`出版物`, `大阪公立大学・山本和樹の学術出版物一覧`, '/ja/publications', "ja");
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
            <h1>出版物</h1>
            <ul className="list-none">
                <li>
                    <a href="https://scholar.google.com/citations?user=qF3OqP0AAAAJ&hl=ja&oi=sra" target="_blank" rel="noopener noreferrer" >Google Scholar</a>
                </li>
                <li>
                    <a href="https://www.webofscience.com/wos/author/record/ACR-5130-2022" target="_blank" rel="noopener noreferrer" >Web of Science</a>
                </li>
            </ul>
            <h2>プレプリント</h2>
            <ul className="list-none">
                {
                    preprints.map((paper, index, array) => (
                        <PaperItem key={index} paper={paper} number={array.length - index + total_published_count} />
                    ))
                }
            </ul>
            <h2>査読付き論文</h2>
            {
                published_papers_by_year.map(({ year, data }, index) => (
                    <React.Fragment key={index}>
                    <h3>{year}</h3>
                    <ul className="list-none">
                        {
                            data.map((paper, index, array) => (
                                <PaperItem key={index} paper={paper} number={total_published_count - (published_papers.indexOf(paper))} />
                            ))
                        }
                    </ul>
                    </React.Fragment>))
            }
            <h2>学会発表論文集</h2>
            <ul className="list-none">
                {
                    conference_paper.map((paper, index, array) => (
                        <PaperItem key={index} paper={paper} number={array.length - index} />
                    ))
                }
            </ul>
            <h2>その他</h2>
            <ul className="list-none">
                <li><a href="https://repository.kulib.kyoto-u.ac.jp/dspace/handle/2433/283521" rel="noopener noreferrer" target="_blank">博士論文</a></li>
                <li>修士論文 (リンクはリクエスト可能)</li>
            </ul>
        </div>
    );
}
async function PaperItem({ paper, number }: { paper: Paper, number: number }) {
    const markdownContent = await convertMarkdownToHtml(`${number}. ${paper.title}`);
    const noteContent = paper.note ? await convertMarkdownToHtml(paper.note) : null;
    return (
        <li>
             <p dangerouslySetInnerHTML={{ __html: markdownContent || "" }} />
            <p><UnderlinedText text={paper.authors} target={`Kazuki Yamamoto`} /></p>
            <p>
                {paper.journal === null ?
                    (<a href={`https://arxiv.org/abs/${paper.arXiv}`} target="_blank" rel="noopener noreferrer">arXiv:{paper.arXiv}</a>) :
                    (<><a href={paper.journal?.url} target="_blank" rel="noopener noreferrer">{paper.journal?.name}</a>{
                        paper.arXiv && <>{` (`}<a href={`https://arxiv.org/abs/${paper.arXiv}`} target="_blank" rel="noopener noreferrer">arXiv:{paper.arXiv}</a>{`)`}</>
                    }
                    </>)
                }
            </p>
            <p dangerouslySetInnerHTML={{ __html: noteContent || "" }} />
        </li>
    );
}

function UnderlinedText({ text, target }: { text: string, target: string }) {
    const parts = text.split(target); // ターゲット文字で分割

    return (
        <>
            {parts.map((part, i) => (
                <React.Fragment key={i}>
                    {part}
                    {i < parts.length - 1 && <u>{target}</u>}
                </React.Fragment>
            ))}
        </>
    );
}
