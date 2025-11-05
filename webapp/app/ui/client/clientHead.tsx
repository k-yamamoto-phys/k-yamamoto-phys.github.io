'use client'

import { useEffect } from "react";
import { useAtom } from "jotai";
import { EngAtom } from "@/app/lib/atom";
import { usePathname } from "next/navigation";

export default function ClientHead() {
    return <LangSetting />;
}

function LangSetting() {
    const [isEnglish, setIsEnglish] = useAtom(EngAtom);
    const path = usePathname(); 
    const locale = path.split("/")[1];

    useEffect(() => {
        if (locale === "ja") {
            setIsEnglish(false);
        } else if (locale === "en") {
            setIsEnglish(true);
        }
    }, [locale, setIsEnglish]);

    // Load saved language preference on reload
    useEffect(() => {
        const savedLang = localStorage.getItem('lang');
        if (savedLang !== "ja") {
            setIsEnglish(true);
        } else {
            setIsEnglish(false);
        }
    }, [setIsEnglish]);
    
    // Save language preference to localStorage
    useEffect(() => {
        localStorage.setItem('lang', isEnglish ? "en" : "ja");
    }, [isEnglish]);

    return null;
}