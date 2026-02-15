import type { Metadata } from "next";
// import { OGPheight, OGPwidth } from "./ogp_utility/createOGP" // 将来OGPを自動生成できるようにする。
import {siteMetadata} from "@/group/_metadata.js";
export const MetadataGenerator: (title: string, description: string, page_path: string, lang: "ja" | "en") => Metadata 
= (title, description, page_path, lang) =>  {
    const ogp_path = `${siteMetadata.publicURL}/ogp/other_page.png`;
    // console.log(title, description, page_path)
    const eng_path = lang === "en" ? page_path : page_path.replace('/ja', '');
    const ja_path = lang === "ja" ? page_path : `/ja${page_path}`;
    const languages = siteMetadata.noEnglish.includes(page_path) ? {
    } : {
        en: eng_path,
        ja: ja_path,
        };
    const OGPwidth = 1200;
    const OGPheight = 630;
    const fullTitle = lang === "ja" ? `${title} | ${siteMetadata.SiteTitle.ja}` : `${title} | ${siteMetadata.SiteTitle.en}`;
    return {
    title: {
        absolute: fullTitle,
    },
        metadataBase: new URL(siteMetadata.publicURL), 
    description: description,
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
        description,
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
        description: description,
        url: page_path,
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
        canonical: page_path, 
        languages
    }

}
}