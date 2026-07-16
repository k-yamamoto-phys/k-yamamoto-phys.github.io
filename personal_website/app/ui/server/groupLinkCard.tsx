import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { siteMetadata } from "@/personal/_metadata";

type GroupLinkCardProps = {
    lang: "ja" | "en";
};

export default function GroupLinkCard({ lang }: GroupLinkCardProps) {
    const group = siteMetadata.GroupSite[lang];

    return (
        <Link
            href={group.href}
            className="group not-prose mb-6 mx-4 flex w-ful items-center gap-3 rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`${group.name} — ${group.action}`}
        >
            <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase  text-secondary">
                    {group.eyebrow}
                </span>
                <span className="mt-1 block text-base font-bold leading-snug text-base-content sm:text-lg">
                    {group.name}
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {group.action}
                    <FaArrowRight
                        className="transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                    />
                </span>
            </span>
        </Link>
    );
}
