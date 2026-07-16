import { convertMarkdownToHtml } from "@/app/lib/markdown";
import { withBasePath } from "@/app/lib/site-paths";
import pressReleaseData from "@/group/press_releases.yml";
import dayjs from "dayjs";
import Link from "next/link";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";

export type PressReleaseEntry = {
    title: {
        ja: string;
        en: string;
    };
    date: string;
    from: {
        ja: string;
        en: string;
    };
    url: {
        ja: string;
        en: string;
    };
    figure: string;
    introduction: {
        ja: string;
        en: string;
    };
};

const pressReleases = pressReleaseData as PressReleaseEntry[];
const publishedPressReleases = pressReleases.filter(
    (item) => item.date.trim().toUpperCase() !== "TBA",
);

function localizedValue(value: { ja: string; en: string }, lang: string) {
    return lang === "ja" ? value.ja : value.en;
}

function formatDate(date: string, lang: string) {
    const parsedDate = dayjs(date);

    if (!parsedDate.isValid()) {
        return date;
    }

    return parsedDate.format(lang === "ja" ? "YYYY年M月D日" : "MMM. D, YYYY");
}

export function TopPageRelease({ lang }: { lang: string }) {
    const latestRelease = publishedPressReleases[0];

    if (!latestRelease) {
        return null;
    }

    const researchPath = lang === "ja" ? "/ja/research" : "/research";

    return (
        <div className="card bg-white shadow-sm sm:card-side">
            <img
                src={withBasePath(latestRelease.figure)}
                className="mx-auto w-64 object-contain p-4"
                alt={localizedValue(latestRelease.title, lang)}
            />
            <div className="card-body pt-0 sm:pt-4">
                <h2 className="card-title mt-4 mb-2 block">
                    <span className="badge badge-info relative -top-0.5">
                        {lang === "ja" ? "最新の研究" : "Recent Research"}
                    </span>{" "}
                    <span className="inline">{localizedValue(latestRelease.title, lang)}</span>
                </h2>
                <p>{localizedValue(latestRelease.introduction, lang)}</p>
                <div className="card-actions justify-end">
                    <Link href={researchPath} className="btn btn-primary text-white">
                        {lang === "ja" ? "詳細" : "Details"}
                        <FaArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export function PressReleases({ lang }: { lang: string }) {
    if (publishedPressReleases.length === 0) {
        return null;
    }

    return (
        <div className="not-prose grid gap-6">
            {publishedPressReleases.map((item) => (
                <PressReleaseItem item={item} lang={lang} key={`${item.date}-${item.title.en}`} />
            ))}
        </div>
    );
}

async function PressReleaseItem({ item, lang }: { item: PressReleaseEntry; lang: string }) {
    const title = localizedValue(item.title, lang);
    const introduction = localizedValue(item.introduction, lang);
    const organization = localizedValue(item.from, lang);
    const url = localizedValue(item.url, lang);
    const introductionHtml = await convertMarkdownToHtml(introduction);
    const hasValidDate = dayjs(item.date).isValid();

    return (
        <article className="card overflow-hidden border border-base-300 bg-white shadow-sm lg:card-side">
            <figure className="bg-base-200 lg:w-72 lg:shrink-0">
                <img
                    src={withBasePath(item.figure)}
                    alt={title}
                    className="h-52 w-full object-contain p-4 lg:h-full"
                    loading="lazy"
                />
            </figure>
            <div className="card-body gap-3 p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                    {hasValidDate ? (
                        <time dateTime={item.date} className="font-semibold text-primary">
                            {formatDate(item.date, lang)}
                        </time>
                    ) : (
                        <span className="font-semibold text-primary">{item.date}</span>
                    )}
                    <span className="badge badge-outline">{organization}</span>
                </div>
                <h3 className="card-title text-xl leading-snug text-base-content">{title}</h3>
                <div
                    className="prose prose-sm max-w-none text-base-content/80"
                    dangerouslySetInnerHTML={{ __html: introductionHtml }}
                />
                <div className="card-actions mt-auto justify-end pt-2">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary text-white"
                    >
                        {lang === "ja" ? "プレスリリースを見る" : "View press release"}
                        <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                </div>
            </div>
        </article>
    );
}
