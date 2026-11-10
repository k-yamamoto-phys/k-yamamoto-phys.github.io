import type { Metadata } from "next";
import {siteMetadata} from "@/group/_metadata.js";
import { siteUrl, withoutBasePath } from "./site-paths";
import { createOGP, OGPheight, OGPwidth, resolvePageTitle } from "./ogp_utility/createOGP";

function removeJaPrefix(path: string) {
    if (path === "/ja" || path === "/ja/") return "/";
    if (path.startsWith("/ja/")) return path.slice(3);
    return path;
}

function addJaPrefix(path: string) {
    return path === "/" ? "/ja" : `/ja${path}`;
}

export const MetadataGenerator: (title: string, description: string, page_path: string, lang: "ja" | "en") => Metadata 
= (title, description, page_path, lang) =>  {
    const pagePath = withoutBasePath(page_path);
    const pageTitle = resolvePageTitle(title, pagePath, lang);
    const ogp_path = siteUrl(createOGP(pageTitle, pagePath, lang));
    const eng_path = lang === "en" ? pagePath : removeJaPrefix(pagePath);
    const ja_path = lang === "ja" ? pagePath : addJaPrefix(pagePath);
    const languages = siteMetadata.noEnglish.includes(pagePath) ? {
    } : {
        en: siteUrl(eng_path),
        ja: siteUrl(ja_path),
        };
    const fullTitle = `${pageTitle} | ${siteMetadata.PageTitleSuffix[lang]}`;
    const pageDescription = description.trim();
    const separator = lang === "ja"
        ? (/[。！？]$/.test(pageDescription) ? "" : "。")
        : (/[.!?]$/.test(pageDescription) ? " " : ". ");
    const affiliation = siteMetadata.affiliationDescription[lang];
    const isHomePage = pagePath === "/" || pagePath === "/ja" || pagePath === "/ja/";
    let fullDescription = affiliation;
    if (pageDescription) {
        fullDescription = isHomePage
            ? `${affiliation}${lang === "ja" ? "" : " "}${pageDescription}${separator.trimEnd()}`
            : `${pageDescription}${separator}${affiliation}`;
    }
    return {
    title: {
        absolute: fullTitle,
    },
        metadataBase: new URL(siteMetadata.publicURL),
    description: fullDescription,
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
        },
    },
    twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description: fullDescription,
        images: ogp_path, // Must be an absolute URL
    },
    referrer: 'strict-origin-when-cross-origin',
        keywords: lang === "ja" ? [siteMetadata.SiteTitle.ja, siteMetadata.name.ja, siteMetadata.organization.ja] : [siteMetadata.SiteTitle.en, siteMetadata.name.en, siteMetadata.organization.en],
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: fullTitle,
        description: fullDescription,
        url: siteUrl(pagePath),
        images: [
            {
                url: ogp_path, // Must be an absolute URL
                width: OGPwidth,
                height: OGPheight, 
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: siteUrl(pagePath),
        languages
    }

}
}
