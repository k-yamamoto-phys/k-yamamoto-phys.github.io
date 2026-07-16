"use client";

import { GoLinkExternal } from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { siteMetadata } from "@/personal/_metadata.js";
import { EngAtom } from "@/app/lib/atom";
import { LangButton } from "./langBotton";

export default function Navbar() {
    const [isEnglish] = useAtom(EngAtom);
    const pathname = usePathname();
    const links = isEnglish ? siteMetadata.Navigation.en : siteMetadata.Navigation.ja;
    const siteTitle = isEnglish ? siteMetadata.SiteTitle.en : siteMetadata.SiteTitle.ja;
    const externalLinks = isEnglish ? siteMetadata.ExternalLinks.en : siteMetadata.ExternalLinks.ja;
    const dialogRef = useRef<HTMLDialogElement>(null);
    const externalDetailsRef = useRef<HTMLDetailsElement>(null);

    const openModal = () => {
        dialogRef.current?.showModal();
    };
    const closeModal = () => {
        dialogRef.current?.close();
    };
    const closeExternalDropdown = () => {
        externalDetailsRef.current?.removeAttribute("open");
    };
    const closeExternalLinks = () => {
        closeExternalDropdown();
        closeModal();
    };

    useEffect(() => {
        closeExternalDropdown();
        closeModal();
    }, [pathname]);

    const homeHref = isEnglish ? "/" : "/ja";

    return (
        <header className="navbar pb-0 bg-base-100 shadow-sm">
            <div className="flex flex-col items-stretch w-full">
                <div className="flex items-center justify-between pl-2">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={openModal}
                            className="btn btn-ghost p-2 md:hidden"
                            aria-label={isEnglish ? "Open menu" : "メニューを開く"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>
                        <Link href={homeHref} className="flex gap-2 items-center">
                            <img src="/OMU.svg" className="w-10 h-10" alt="" />
                            <div className="font-bold text-xl">{siteTitle}</div>
                        </Link>
                    </div>
                    <LangButton />
                </div>

                <nav className="hidden md:flex" aria-label={isEnglish ? "Main navigation" : "メインナビゲーション"}>
                    <ul className="menu menu-horizontal px-1">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                        <li>
                            <details ref={externalDetailsRef} style={{ zIndex: 9999 }}>
                                <summary>{isEnglish ? "External" : "外部リンク"}</summary>
                                <ul className="p-2 w-auto min-w-max" style={{ marginTop: ".8rem" }}>
                                    {externalLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} target="_blank" rel="noopener noreferrer" onClick={closeExternalLinks}>
                                                {link.name} <GoLinkExternal />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        </li>
                    </ul>
                </nav>
            </div>

            <dialog ref={dialogRef} className="modal">
                <div className="bg-base-100 left-0 right-0 top-72 bottom-0 w-full h-full overflow-y-auto">
                    <div className="navbar bg-base-100">
                        <div className="flex flex-col items-stretch w-full">
                            <div className="flex items-center justify-between pl-2">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="btn btn-ghost p-2 md:hidden"
                                        aria-label={isEnglish ? "Close menu" : "メニューを閉じる"}
                                    >
                                        <svg className="fill-current h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                                        </svg>
                                    </button>
                                    <Link href={homeHref} className="flex gap-2 items-center" onClick={closeModal}>
                                        <img src="/OMU.svg" className="w-10 h-10" alt="" />
                                        <div className="font-bold text-xl">{siteTitle}</div>
                                    </Link>
                                </div>
                                <LangButton />
                            </div>
                        </div>
                    </div>

                    <nav aria-label={isEnglish ? "Mobile navigation" : "モバイルナビゲーション"}>
                        <ul className="menu menu-xl mt-3 p-2 w-auto">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="c-globalNavigation__categoryLink" onClick={closeModal}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="mt-2">
                                <summary aria-disabled="true" style={{ pointerEvents: "none" }}>
                                    {isEnglish ? "External" : "外部リンク"}
                                </summary>
                                <ul className="p-2 w-auto min-w-max">
                                    {externalLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} target="_blank" rel="noopener noreferrer" onClick={closeExternalLinks}>
                                                {link.name} <GoLinkExternal />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex flex-row-reverse">
                        <button type="button" className="btn btn-primary m-2" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </header>
    );
}
