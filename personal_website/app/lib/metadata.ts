import type { Metadata } from "next";
// import { OGPheight, OGPwidth } from "./ogp_utility/createOGP" // 将来OGPを自動生成できるようにする。
import {siteMetadata} from "@/personal/_metadata.js";
export const MetadataGenerator: (title: string, description: string, ogp_path?: string) => Metadata = (title, description, ogp_path = `${siteMetadata.publicURL}/ogp/other_page.png`) =>  {
    const OGPwidth = 1200;
    const OGPheight = 630;
    return {
    title: {
        absolute: `${title} | ${siteMetadata.name.en}`,
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
    // icons: {
    //     apple: 'favicons/apple-touch-icon.png',
    //     icon: '/favicons/icon.png',
    //     // other: [{
    //     //     rel: "manifest", url: "/favicons/site.webmanifest"
    //     // }, { rel: "mask-icon", url: "/favicons/safari-pinned-tab.svg" }],
    // },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
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
        title: `${title} | ${siteMetadata.name.en}`,
        description: description,
        url: siteMetadata.publicURL,
        images: [
            {
                url: ogp_path, // Must be an absolute URL
                width: OGPwidth,
                height: OGPheight, 
            },
        ],
        type: 'website',
    },

}
}