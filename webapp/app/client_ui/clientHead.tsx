'use client'

import { useEffect } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/app/lib/atom";

export default function ClientHead() {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom);
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        } else {
            const osPreference = window.matchMedia('(prefers-color-scheme: dark)').matches; 
            setDarkMode(osPreference); 
        }
    }, [setDarkMode]);
    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');        
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);
    return <></>
}
