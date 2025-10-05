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
        return navigator.language.startsWith("ja") ? "ja" : "en";
    } 
    return "en";
}


