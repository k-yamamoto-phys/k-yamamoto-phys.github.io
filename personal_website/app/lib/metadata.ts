import type { Metadata } from "next";
// import { OGPheight, OGPwidth } from "./ogp_utility/createOGP" // 将来OGPを自動生成できるようにする。
import {siteMetadata} from "@/personal/_metadata.js";
export const MetadataGenerator: (title: string, description: string, page_path: string) => Metadata 
= (title, description, page_path) =>  {
    const lang = page_path === "/ja" || page_path.startsWith("/ja/") || page_path === "/not-found" ? "ja" : "en";
    const name = lang === "ja" ? siteMetadata.name.ja.replace(/\s+/g, "") : siteMetadata.name.en;
    const fullTitle = `${title.trim()} | ${name}`;
    const isHomePage = page_path === "/" || page_path === "/ja" || page_path === "/ja/";
    const fullDescription = isHomePage
        ? `${siteMetadata.affiliationDescription[lang]}${lang === "ja" ? "" : " "}${description.trim()}`
        : description;
    const ogp_path = `${siteMetadata.publicURL}/ogp/other_page.png`;
    // console.log(title, description, page_path)
    const eng_path = page_path === '/' ? 
        page_path : 
        (page_path.split('/')[1] === 'ja' ? page_path.replace('/ja', '') : page_path);
    const ja_path = page_path === '/' ? 
        page_path + 'ja' : 
        (page_path.split('/')[1] === 'ja' ? page_path : `/ja${page_path}`);
    const languages = siteMetadata.noEnglish.includes(page_path) ? {

    } : {
        en: eng_path,
        ja: ja_path,
        };
    const OGPwidth = 1200;
    const OGPheight = 630;
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
    // icons: {
    //     apple: 'favicons/apple-touch-icon.png',
    //     icon: '/favicons/icon.png',
    //     // other: [{
    //     //     rel: "manifest", url: "/favicons/site.webmanifest"
    //     // }, { rel: "mask-icon", url: "/favicons/safari-pinned-tab.svg" }],
    // },
    twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description: fullDescription,
        images: ogp_path, // Must be an absolute URL
    },
    referrer: 'strict-origin-when-cross-origin',
        keywords: [siteMetadata.name.en, siteMetadata.name.ja, siteMetadata.organization.ja, siteMetadata.organization.en],
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: fullTitle,
        description: fullDescription,
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
