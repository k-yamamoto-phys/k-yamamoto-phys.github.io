import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link"
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';
import { MetadataGenerator } from "@/app/lib/metadata";
import { loadYAML } from "@/app/lib/file-loader"
import { convertMarkdownToHtml } from "@/app/lib/markdown"
import dayjs from "dayjs";
import React from "react";
type Presentation = {
    title: string;
    presenter: string;
    date: Date;
    detail: string;
    type: "invited" | "seminar" | "talk" | "poster" | "other";
    isInternational: boolean;
}
const BadgeMap = {
    invited: "badge-warning",
    seminar: "badge-info",
    talk: "badge-success",
    poster: "badge-accent",
    other: "badge-natural"
}
export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
    return MetadataGenerator(`Presentations`, `presentations by Dr. Kazuki Yamamoto`);
}

export default async function Page() {
    const conference_unsorted = loadYAML("app/site_data/presentation.yml") as Presentation[];
    const conference = conference_unsorted.sort((a, b) => (a.date < b.date ? 1 : -1));
    const current = new Date();
    const upcoming = conference.filter(p => dayjs(p.date).isAfter(current)).sort((a,b) => (a.date < b.date ? -1 : 1));
    return (
        <div className="m-2 p-2 prose">
            <h1>Presentations</h1>
            {
                upcoming.length > 0 && <>  <h2>Upcoming</h2>
                    <ul>
                        {
                            upcoming.map((p, index, array) => (
                                <ConferenceItem key={index} p={p} number={array.length - index} />
                            ))
                        }
                    </ul></>
            }

            <h2>International</h2>
            <ul>
                {
                    conference.filter(p => p.isInternational && dayjs(p.date).isBefore(current)).map((p, index, array) => (
                        <ConferenceItem key={index} p={p} number={array.length - index} />
                    ))
                }
            </ul>
            <h2>Domestic</h2>
            <ul>
                {
                    conference.filter(p => !p.isInternational && dayjs(p.date).isBefore(current)).map((p, index, array) => (
                        <ConferenceItem key={index} p={p} number={array.length - index} />
                    ))
                }
            </ul>
        </div>
    );
}

async function ConferenceItem({ p, number }: { p: Presentation, number: number }) {
    const badgeType = BadgeMap[p.type];
    const markdownContent = await convertMarkdownToHtml(p.detail);
    return (
        <li>
            <p>
                {number}. <span className={`badge  badge-soft ${badgeType}`}>{p.type}</span>  "{p.title}"
            </p>

            <p><UnderlinedText text={p.presenter} targets={[`Kazuki Yamamoto`, `山本 和樹`, `山本和樹`, `山本　和樹`]}/></p>
            <p dangerouslySetInnerHTML={{ __html: markdownContent || "" }} />
        </li>
    );
}

function UnderlinedText({
    text,
    targets,
}: {
    text: string;
    targets: string[];
}) {
    // 正規表現を動的に作る（大文字小文字区別あり）
    const regex = new RegExp(`(${targets.join("|")})`, "g");

    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) =>
                targets.includes(part) ? (
                    <u key={i}>{part}</u>
                ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                )
            )}
        </>
    );
}
