'use client'

import { useAtom } from "jotai";
import { EngAtom } from "@/app/lib/atom"
import { usePathname, useRouter } from 'next/navigation';
import { siteMetadata } from "@/group/_metadata";
import { withoutBasePath } from "@/app/lib/site-paths";
import { useEffect } from "react";


export function LangSetting() {
    const [isEnglish, setIsEnglish] = useAtom(EngAtom);
    const currentPath = usePathname();
    const logicalPath = withoutBasePath(currentPath);
    const locale = logicalPath.split("/")[1] === "ja" ? "ja" : "en";
    useEffect(() => {
        if (locale === "ja") {
            localStorage.setItem('lang', "ja");
            setIsEnglish(false);
        } else if (locale === "en") {
            localStorage.setItem('lang', "en");
            setIsEnglish(true);
        } else {
            const savedLang = localStorage.getItem('lang');
            if (savedLang !== "ja") {
                localStorage.setItem('lang', "en");
                setIsEnglish(true);
            } else {
                localStorage.setItem('lang', "ja");
                setIsEnglish(false);
            }
        }
    }, [locale, setIsEnglish]);
    return <></>;
}
export const LangButton = () => {
    const [isEnglish, setIsEnglish] = useAtom(EngAtom);
    const currentPath = usePathname();
    const logicalPath = withoutBasePath(currentPath);
    const router = useRouter();
    if (siteMetadata.noEnglish.includes(logicalPath)) return <></>;
    const locale = logicalPath.split("/")[1] === "ja" ? "ja" : "en";
    const lang = isEnglish ? "en" : "ja";
    const handleClick = () => {
        if (!isEnglish) {
            localStorage.setItem('lang', "en");
            setIsEnglish(true);
        } else {
            localStorage.setItem('lang', "ja");
            setIsEnglish(false);
        }
    }
    if (locale === lang) {
        const newPath = lang === 'en' ? logicalPath.replace(/^\//, '/ja/') : logicalPath.replace(/^\/ja/, '');

        return <button className="btn  btn-ghost" onClick={() => router.push(newPath === '' ? '/' : newPath)}>{lang === "en" ? "日本語" : "English"}</button>;
    } else {
        return <button className="btn  btn-ghost" onClick={() => handleClick()}>{isEnglish ? "日本語" : "English"}</button>;
    }
}
