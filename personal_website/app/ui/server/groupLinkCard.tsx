import Link from "next/link";
import { FaArrowRight, FaAtom } from "react-icons/fa";

type GroupLinkCardProps = {
    lang: "ja" | "en";
};

const content = {
    ja: {
        href: "/group/ja",
        eyebrow: "研究室ウェブサイト",
        name: "非平衡量子多体物性理論研究室",
        action: "研究室を見る",
    },
    en: {
        href: "/group",
        eyebrow: "Research group website",
        name: "Nonequilibrium Many-Body Quantum Matter Theory Group",
        action: "Visit group site",
    },
} as const;

export default function GroupLinkCard({ lang }: GroupLinkCardProps) {
    const group = content[lang];

    return (
        <Link
            href={group.href}
            className="group not-prose my-4 flex w-full max-w-lg items-center gap-3 rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`${group.name} — ${group.action}`}
        >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-lg text-primary-content shadow-sm transition-transform duration-200 group-hover:scale-105">
                <FaAtom aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-widest text-secondary">
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
