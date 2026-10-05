import { siteMetadata } from "@/group/_metadata.js";
import { convertMarkdownToHtml } from "@/app/lib/markdown";
import SiteMessageBody from "../client/siteMessageBody";

export type Message = {
    type: string;
    text: { ja: string; en: string };
};

export default async function SiteMessage({
    message = siteMetadata.SiteMessage,
}: { message?: Message }) {
    const ja = message.text.ja.trim();
    const en = message.text.en.trim();
    if (!ja && !en) return null;

    const [jaHtml, enHtml] = await Promise.all([
        ja ? convertMarkdownToHtml(ja) : "",
        en ? convertMarkdownToHtml(en) : "",
    ]);

    return <SiteMessageBody type={message.type} jaHtml={jaHtml} enHtml={enHtml} />;
}
