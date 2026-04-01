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
                        <svg width="100%" height="100%" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><rect id="アートボード1" x="0" y="0" width="127.559" height="127.559" style="fill:none;" /><clipPath id="_clip1"><rect x="0" y="0" width="127.559" height="127.559" /></clipPath><g clip-path="url(#_clip1)"><g><path d="M127.553,56.672c-1.442,-9.762 -6.151,-18.695 -13.203,-26.056c-0.041,-0.037 -0.081,-0.052 -0.144,-0.064c-4.355,-0.687 -10.331,-0.431 -17.862,1.945c-11.459,3.617 -23.221,15.584 -29.663,29.187l-0.001,-0.001c-0.164,0.351 -0.478,0.606 -0.904,0.495c-0.417,-0.109 -0.565,-0.478 -0.535,-0.825c1.783,-20.373 8.073,-36.854 23.057,-46.394c0.004,-0.002 0.007,-0.005 0.01,-0.007c0.293,-0.186 0.231,-0.46 -0.075,-0.569c-7.538,-2.542 -15.795,-3.946 -24.453,-3.946c-8.658,0 -16.915,1.404 -24.452,3.946c-0.308,0.109 -0.368,0.383 -0.075,0.569c0.003,0.002 0.006,0.005 0.009,0.007c14.984,9.54 21.273,26.02 23.057,46.394c0.031,0.346 -0.118,0.716 -0.535,0.825c-0.426,0.111 -0.74,-0.144 -0.904,-0.495l0,0.001c-6.442,-13.604 -18.204,-25.57 -29.664,-29.187c-7.531,-2.377 -13.507,-2.632 -17.861,-1.945c-0.065,0.012 -0.105,0.027 -0.144,0.064c-7.051,7.361 -11.762,16.294 -13.204,26.056c-0.044,0.316 0.151,0.463 0.469,0.331c0.001,-0.001 0.003,-0.001 0.005,-0.002c7.723,-3.312 19.462,-7.033 34.765,-4.44c8.509,1.441 15.848,5.43 22.659,10.644c0.227,0.208 0.34,0.538 0.148,0.865c-0.202,0.346 -0.568,0.4 -0.914,0.29c-12.897,-4.353 -36.134,-2.695 -54.31,15.085c-0.061,0.062 -0.062,0.099 -0.042,0.155c4.192,10.368 12.219,19.292 22.699,25.676c0.238,0.139 0.415,0.003 0.474,-0.251c4.004,-22.225 20.005,-35.772 37.82,-35.772c17.815,0 33.816,13.547 37.82,35.772c0.06,0.254 0.237,0.39 0.474,0.251c10.48,-6.384 18.506,-15.308 22.699,-25.676c0.02,-0.055 0.019,-0.093 -0.041,-0.155c-18.177,-17.78 -41.412,-19.439 -54.31,-15.085c-0.345,0.11 -0.712,0.057 -0.915,-0.29c-0.193,-0.328 -0.078,-0.657 0.148,-0.865c6.811,-5.214 14.151,-9.203 22.66,-10.644c15.303,-2.592 27.041,1.128 34.765,4.44c0.001,0.001 0.003,0.001 0.005,0.002c0.318,0.132 0.513,-0.015 0.468,-0.331" style="fill:#be9b39;fill-rule:nonzero;" /><path d="M69.079,73.801l-10.599,0c-0.364,0.012 -0.379,0.219 -0.343,0.531l4.931,42.109c0.109,0.907 1.314,0.907 1.424,0l4.93,-42.109c0.037,-0.312 0.022,-0.519 -0.343,-0.531" style="fill:#95999b;fill-rule:nonzero;" /></g></g></svg>



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
