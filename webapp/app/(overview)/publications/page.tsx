import type { ResolvingMetadata, Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import { loadYAML } from "@/app/lib/file-loader"

import React from "react";
type Paper = {
    title: string;
    authors: string;
    arXiv?: string;
    journal?: {
        name: string;
        url: string;
    };
}
export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
    return MetadataGenerator(`Publications`, `List of academic publications by Dr. Kazuki Yamamoto`);
}

export default async function Page() {
    const regular_paper = loadYAML("app/site_data/paper_regular.yml") as Paper[];
    const conference_paper = loadYAML("app/site_data/paper_conference.yml") as Paper[];
    return (
        <div className="m-2 p-2 prose">
            <h1>Publications</h1>
            <ul>
                <li>
                    <a href="https://scholar.google.com/citations?user=qF3OqP0AAAAJ&hl=ja&oi=sra" target="_blank" rel="noopener noreferrer" >Google Scholar</a>
                </li>
                <li>
                    <a href="https://www.webofscience.com/wos/author/record/ACR-5130-2022" target="_blank" rel="noopener noreferrer" >Web of Science</a>
                </li>
            </ul>
            <h2>Original Paper</h2>
            <ul>
                {
                    regular_paper.map((paper, index, array) => (
                        <PaperItem key={index} paper={paper} number={array.length - index} />
                    ))
                }
            </ul>
            <h2>Conference Proceedings</h2>
            <ul>
                {
                    conference_paper.map((paper, index, array) => (
                        <PaperItem key={index} paper={paper} number={array.length - index} />
                    ))
                }
            </ul>
            <h2>Others</h2>
            <ul>
                <li><a href="https://repository.kulib.kyoto-u.ac.jp/dspace/handle/2433/283521" rel="noopener noreferrer" target="_blank">Doctoral dissertation</a></li>
                <li>Master thesis (links can be requested)</li>
            </ul>
        </div>
    );
}

function PaperItem({ paper, number }: { paper: Paper, number: number }) {
    return (
        <li>
            <p>
                {number}. "{paper.title}"
            </p>
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
