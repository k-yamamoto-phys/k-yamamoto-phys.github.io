'use client'

import { useAtom } from "jotai";
import { EngAtom } from "@/app/lib/atom"
import { redirect, usePathname, useRouter } from 'next/navigation';
import { siteMetadata } from "@/personal/_metadata";
import { useEffect } from "react";


export function LangSetting() {
    const [isEnglish, setIsEnglish] = useAtom(EngAtom);
    const currentPath = usePathname();
    const locale = currentPath.split("/")[1] === "ja" ? "ja" : "en";
    console.log("Current locale:", locale, currentPath);
    useEffect(() => {
        if (locale === "ja") {
            // console.log("Language set to Japanese");
            localStorage.setItem('lang', "ja");
            setIsEnglish(false);
        } else if (locale === "en") {
            // console.log("Language set to English");
            localStorage.setItem('lang', "en");
            setIsEnglish(true);
        } else {
            const savedLang = localStorage.getItem('lang');
            // console.log("calling savedLang: ", savedLang)
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
    const router = useRouter();
    if (siteMetadata.noEnglish.includes(currentPath)) return <></>;
    const locale = currentPath.split("/")[1] === "ja" ? "ja" : "en";
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
        const newPath = lang === 'en' ? currentPath.replace(/^\//, '/ja/') : currentPath.replace(/^\/ja/, '');

        return <button className="btn" onClick={() => router.push(newPath === '' ? '/' : newPath)}>{lang === "en" ? "日本語" : "English"}</button>;
    } else {
        return <button className="btn" onClick={() => handleClick()}>{isEnglish ? "日本語" : "English"}</button>;
    }
}

