import { redirect } from "next/navigation";

// top pageアクセスの際のリダイレクト処理

export default function RootPage() { 
    const lang = detectUserLang(); 
    if (lang === "ja") {
        redirect("/ja");
    } else {
        redirect("/en");
    }
}

const detectUserLang = (): string => {
    if (typeof navigator !=='undefined') {
        const isJapanese =
            navigator.languages?.some(lang => lang.startsWith("ja")) ||
            navigator.language.startsWith("ja");
        return isJapanese ? "ja" : "en";
    } 
    return "en";
}
