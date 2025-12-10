import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link"
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';
import { MetadataGenerator } from "@/app/lib/metadata";
import { convertMarkdownToHtml } from "@/app/lib/markdown"
import conference_data from "@/app/site_data/presentation.yml"
import dayjs from "dayjs";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./presentations.module.css";
type Presentation = {
    title: string;
    presenter: string;
    date: Date;
    detail: string;
    category: "international" | "domestic" | "seminar";
    type: "invited" | "oral" | "poster";
}
const BadgeMap = {
    award: "badge-warning",
    publication: "badge-success",
    seminar: "badge-info",
    "invited seminar": "badge-info",
    talk: "badge-accent",
    "invited talk": "badge-accent",
    poster: "badge-natural",
}
export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`Presentations`, `presentations by Dr. Kazuki Yamamoto`);
}

export default async function Page() {
    const conference_unsorted = conference_data as Presentation[];
    const conference = conference_unsorted.sort((a, b) => (a.date < b.date ? 1 : -1));
    const current = new Date();
    const upcoming = conference.filter(p => dayjs(p.date).isAfter(current)).sort((a, b) => (a.date < b.date ? -1 : 1));
    return (
        <div className="m-2 p-2 prose">
            <h1>Presentations</h1>
            {
                upcoming.length > 0 && <>  <h2>Upcoming</h2>
                    <ul className="list-none">
                        {
                            upcoming.map((p, index, array) => (
                                <ConferenceItem key={index} p={p} number={array.length - index} />
                            ))
                        }
                    </ul></>
            }
            <h2>International Conferences</h2>
            <CollapsibleSection title="Invited talks" info={conference.filter(p => p.category === "international" && p.type === "invited" && dayjs(p.date).isBefore(current))} />
            <CollapsibleSection title="Oral Presentations" info={conference.filter(p => p.category === "international" && p.type === "oral" && dayjs(p.date).isBefore(current))} />
            <CollapsibleSection title="Poster Presentations" info={conference.filter(p => p.category === "international" && p.type === "poster" && dayjs(p.date).isBefore(current))} />
            <h2>Domestic Conferences</h2>
            <CollapsibleSection title="Invited talks" info={conference.filter(p => p.category === "domestic" && p.type === "invited" && dayjs(p.date).isBefore(current))} />
            <CollapsibleSection title="Oral Presentations" info={conference.filter(p => p.category === "domestic" && p.type === "oral" && dayjs(p.date).isBefore(current))} />
            <CollapsibleSection title="Poster Presentations" info={conference.filter(p => p.category === "domestic" && p.type === "poster" && dayjs(p.date).isBefore(current))} />
            <h2>Seminars and External activities</h2>
            <CollapsibleSection title="Invited talks" info={conference.filter(p => p.category === "seminar" && p.type === "invited" && dayjs(p.date).isBefore(current))} />
            <CollapsibleSection title="Seminars" info={conference.filter(p => p.category === "seminar" && p.type === "oral" && dayjs(p.date).isBefore(current))} />
        </div>
    );
}
async function CollapsibleSection({ title, info }: { title: string; info: Presentation[]; }) {
    return (
        <>
            {info.length > 0 && (
                <details className="collapse bg-base-100">
                    <summary className="collapse-title p-0"><h3 className="border-b border-base-600 flex justify-between content-center"><div>{title}</div><IoIosArrowDown className={`inline-block my-auto ${styles.arrow}`} /></h3></summary>
                    <div className="collapse-content text-sm">
                        <ul className="list-none">
                            {
                                info.map((p, index, array) => (
                                    <ConferenceItem key={index} p={p} number={array.length - index} />
                                ))
                            }
                        </ul>
                    </div>
                </details>

            )}
        </>
    );
}
async function ConferenceItem({ p, number }: { p: Presentation, number: number }) {
    const markdownContent = await convertMarkdownToHtml(p.detail);
    return (
        <li>
            <p>
                {number}.&nbsp;
                "{p.title}"
            </p>

            <p><UnderlinedText text={p.presenter} targets={[`Kazuki Yamamoto`, `山本 和樹`, `山本和樹`, `山本　和樹`]} /></p>
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
