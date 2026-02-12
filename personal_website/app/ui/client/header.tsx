"use client";
import { FaHome, FaSearch, FaBook, FaExternalLinkAlt } from 'react-icons/fa';
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
                                                <Link href={link.href} target="_blank" rel="noopener noreferrer" onClick={closeMenu} >{link.name} <FaExternalLinkAlt /></Link>

                                            </li>
                                        ))
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <Link
                        href={isEnglish ? "/en" : "/ja"}
                        className="btn btn-ghost font-bold text-xl flex items-center gap-2"
                    >
                        {/* ロゴ部分 */}
                        <svg
                            className="w-8 h-8"
                            width="144"
                            height="144"
                            viewBox="0 0 144 144"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_734_1515)">
                                <path
                                    d="M114 0H30C13.4315 0 0 13.4315 0 30V114C0 130.569 13.4315 144 30 144H114C130.569 144 144 130.569 144 114V30C144 13.4315 130.569 0 114 0Z"
                                    fill="white"
                                />
                                <path
                                    d="M111.158 18.6719C77.2078 18.6719 48.9378 28.4819 33.0578 41.7819C32.1578 42.5519 31.5078 43.5919 31.5078 45.0119V69.5419C31.5078 69.0219 31.8978 68.6419 32.6678 67.9919C54.4878 50.4319 82.8878 45.1419 111.158 45.1419V18.6819V18.6719Z"
                                    fill="#1C3177"
                                />
                                <path
                                    d="M111.158 98.9125V74.3125C111.158 74.9625 109.998 75.2125 108.188 75.3425C78.8878 77.1525 50.8678 86.1825 31.5078 100.003V128.923C49.5178 116.493 75.6778 105.843 100.488 102.333C100.798 102.293 106.858 101.413 107.618 101.293C108.538 101.153 110.448 100.953 111.008 99.7425C111.128 99.4925 111.158 99.1525 111.158 98.9325V98.9125Z"
                                    fill="#1C3177"
                                />
                                <path
                                    d="M111.158 74.3069C111.158 73.6569 110.508 73.0169 109.478 72.2369C95.9878 62.8269 79.0778 56.1669 59.5878 53.0469C49.9278 56.5469 40.8378 61.4069 32.6678 67.9769C31.8978 68.6269 31.5078 69.0069 31.5078 69.5269C31.5078 70.0469 31.7678 70.1769 32.7978 70.2969C45.5178 71.6469 60.2978 75.0269 73.8878 80.8769C84.7878 77.9669 96.3878 76.0569 108.188 75.3369C109.998 75.2069 111.158 74.9469 111.158 74.3069Z"
                                    fill="#7F96C2"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_734_1515">
                                    <rect width="144" height="144" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

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
                            <details style={{zIndex: 9999}}>
                                <summary>{isEnglish ? "External" : "外部リンク"}</summary>
                                <ul className="p-2 w-auto min-w-max" style={{marginTop: "1.2rem"}}>
                                    {
                                        externalLinks.map((link) => (
                                            <li key={link.href}>
                                                <Link href={link.href} target="_blank" rel="noopener noreferrer">{link.name} <FaExternalLinkAlt /></Link>
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
