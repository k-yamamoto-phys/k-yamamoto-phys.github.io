"use client";

import { usePathname } from "next/navigation";

export default function SiteMessageBody({ type, jaHtml, enHtml }: {
    type: string;
    jaHtml: string;
    enHtml: string;
}) {
    const pathname = (usePathname() ?? "/");
    const isJapanese = pathname === "/ja" || pathname.startsWith("/ja/");
    const html = isJapanese ? jaHtml : enHtml;
    if (!html) return null;
    const warning = type === "warning";

    return (
        <aside
            className={`site-message site-message--${warning ? "warning" : "info"}`}
            role={warning ? "alert" : "status"}
            aria-label={isJapanese ? (warning ? "注意" : "お知らせ") : (warning ? "Warning" : "Information")}
        >
            <div className="site-message__content" dangerouslySetInnerHTML={{ __html: html }} />
        </aside>
    );
}
