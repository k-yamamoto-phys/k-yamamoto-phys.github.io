'use client'

import { useEffect } from "react";
import { useAtom } from "jotai";
import {  EngAtom } from "@/app/lib/atom";
import { usePathname } from "next/navigation";
export default function ClientHead() {
    return (
        <>
        <LangSetting />
        {/* <DarkModeSetting /> */}
        </>
    )
}

// function DarkModeSetting() {
//     const [darkMode, setDarkMode] = useAtom(darkModeAtom);
//     useEffect(() => {
//         const savedTheme = localStorage.getItem('theme');
//         if (savedTheme) {
//             setDarkMode(savedTheme === 'dark');
//         } else {
//             const osPreference = window.matchMedia('(prefers-color-scheme: dark)').matches; 
//             setDarkMode(osPreference); 
//         }
//     }, [setDarkMode]);
//     useEffect(() => {
//         localStorage.setItem('theme', darkMode ? 'dark' : 'light');        
//         document.documentElement.classList.toggle('dark', darkMode);
//     }, [darkMode]);
//     return <></>
// }

function LangSetting() {
    const [isEnglish, setIsEnglish] = useAtom(EngAtom);
    const path = usePathname(); 
    const locale = path.split("/")[1];
    // console.log("Current locale:", locale, path);
    useEffect(()=> {
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

    // リロードの際に設定を保存する
    // useEffect(() => {
    //     const savedLang = localStorage.getItem('lang');
    //     // console.log("Saved language:", savedLang);
    //     if (savedLang !== "ja") {
    //         setIsEnglish(true);
    //     } else {
    //         setIsEnglish(false);
    //     }
    // }, [setIsEnglish]);
    
    // useEffect(() => {
    //     console.log("Saving language:", isEnglish ? "en" : "ja");
    //     localStorage.setItem('lang', isEnglish ? "en" : "ja");
    // }, [isEnglish]);
    return <></>;
}

