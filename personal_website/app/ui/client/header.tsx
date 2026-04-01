"use client";
import { GoLinkExternal } from "react-icons/go";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation';
import React, { use, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import { siteMetadata } from "@/personal/_metadata.js"
import { LangButton } from './langBotton';
import { EngAtom } from '@/app/lib/atom';
import { useAtom } from "jotai";

export default function Navbar() {
    const [isEnglish, setIsEnglish] = useAtom(EngAtom);
    const pathname = usePathname();
    const links = isEnglish ? siteMetadata.Navigation.en : siteMetadata.Navigation.ja;
    const siteTitle = isEnglish ? siteMetadata.SiteTitle.en : siteMetadata.SiteTitle.ja;
    const externalLinks = isEnglish ? siteMetadata.ExternalLinks.en : siteMetadata.ExternalLinks.ja;
    const targetRef = useRef<HTMLDivElement>(null);
    const closeMenu = () => {
        setTimeout(() => {
            targetRef.current?.focus();

        }, 0);
    }
    return (
        <>
            <header className="navbar bg-base-100 shadow-sm" >
                <div
                    ref={targetRef}
                    tabIndex={0}
                ></div>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className={`menu menu-xl dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow w-auto min-w-max`}>
                            {
                                links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="c-globalNavigation__categoryLink" onClick={closeMenu} >{link.name}</Link>
                                    </li>
                                ))
                            }
                            <li className='mt-2' >
                                <summary aria-disabled="true" style={{ pointerEvents: "none" }}>{isEnglish ? "External" : "外部リンク"}</summary>
                                <ul className="p-2 w-auto min-w-max">
                                    {
                                        externalLinks.map((link) => (
                                            <li key={link.href}>
                                                <Link href={link.href} target="_blank" rel="noopener noreferrer" onClick={closeMenu} >{link.name} <GoLinkExternal /></Link>

                                            </li>
                                        ))
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <Link
                        href={isEnglish ? "/" : "/ja"}
                        className="btn btn-ghost font-bold text-xl flex items-center gap-2"
                    >
                        {/* ロゴ部分 */}
                        <img src="/OMU.svg" className="w-8 h-8" />



                        {/* テキスト部分 */}
                        <span>{siteTitle}</span>
                    </Link>


                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="">{link.name}</Link>
                                </li>
                            ))
                        }

                        <li>
                            <details style={{ zIndex: 9999 }}>
                                <summary>{isEnglish ? "External" : "外部リンク"}</summary>
                                <ul className="p-2 w-auto min-w-max" style={{ marginTop: "1.2rem" }}>
                                    {
                                        externalLinks.map((link) => (
                                            <li key={link.href}>
                                                <Link href={link.href} target="_blank" rel="noopener noreferrer">{link.name} <GoLinkExternal /></Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <LangButton />
                </div>
            </header>
        </>
    )
}
