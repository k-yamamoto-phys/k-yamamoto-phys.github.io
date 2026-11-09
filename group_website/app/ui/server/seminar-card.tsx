import Link from "next/link";
import { FaArrowRight, FaChalkboardTeacher } from "react-icons/fa";
import { seminarsURL } from "@/group/_metadata";

export function SeminarCard({ lang }: { lang: "ja" | "en" }) {
    const text = lang === "ja"
        ? {
            title: "セミナー情報",
            description: "セミナーの開催情報はこちらからご覧いただけます。",
            action: "セミナー情報を見る",
        }
        : {
            title: "Seminars",
            description: "Find out about our seminars.",
            action: "View seminar information",
        };

    return (
        <Link
            href={seminarsURL[lang]}
            className="not-prose group my-8 flex flex-col gap-4 rounded-xl border border-secondary/25 bg-white p-5 text-base-content shadow-sm transition hover:border-secondary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary sm:flex-row sm:items-center sm:gap-5 sm:p-7"
        >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <FaChalkboardTeacher className="size-6" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-snug">{text.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-base-content/75">{text.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:underline">
                    {text.action}
                    <FaArrowRight className="shrink-0" aria-hidden="true" />
                </span>
            </div>
        </Link>
    );
}
