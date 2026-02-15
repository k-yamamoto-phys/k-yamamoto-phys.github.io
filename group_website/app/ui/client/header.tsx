"use client";

import { GoLinkExternal } from "react-icons/go";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation';
import React, { use, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import { siteMetadata } from "@/group/_metadata.js"
import { LangButton } from './langBotton';
import { EngAtom } from '@/app/lib/atom';
import { useAtom } from "jotai";
export default function Navbar() {
    const [isEnglish, setIsEnglish] = useAtom(EngAtom);
    const pathname = usePathname();
    const links = isEnglish ? siteMetadata.Navigation.en : siteMetadata.Navigation.ja;
    const siteTitle = isEnglish ? siteMetadata.SiteTitle.en : siteMetadata.SiteTitle.ja;
    const externalLinks = isEnglish ? siteMetadata.ExternalLinks.en : siteMetadata.ExternalLinks.ja;
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openModal = () => {
        dialogRef.current?.showModal();
    }
    const closeModal = () => {
        dialogRef.current?.close();
    };
    return (
        <>
            <header className="navbar pb-0 bg-base-100 shadow-sm" >
                <div className="flex flex-col items-stretch w-full">
                    <div className="flex items-center justify-between pl-2">
                        <div className="flex items-center gap-2">
                            <div role="button" onClick={openModal} className="btn  btn-ghost p-2 md:hidden" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <Link
                                href={isEnglish ? "/" : "/ja"}
                                className="flex gap-2 items-center"
                            >
                                {/* ロゴ部分 */}
                                <Logo />
                                {/* テキスト部分 */}
                                <div className="font-bold text-xl ">{siteTitle}</div>
                            </Link>
                        </div>
                        <LangButton />
                    </div>
                    <div className="hidden md:flex">
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
                                    <ul className="p-2 w-80 max-w-[min(90vw,28rem)] whitespace-normal" style={{ marginTop: ".8rem" }}>
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
                </div>
                <dialog ref={dialogRef} className="modal">
                    <div className="bg-base-100 left-0 right-0 top-72 bottom-0 w-full h-full overflow-y-auto">
                        <div className="navbar bg-base-100" >
                            <div className="flex flex-col items-stretch w-full">
                                <div className="flex items-center justify-between pl-2">
                                    <div className="flex items-center gap-2">
                                        <div role="button" onClick={closeModal} className="btn  btn-ghost p-2 md:hidden" >
                                            <svg
                                                className="swap-on fill-current h-8 w-8"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512">
                                                <polygon
                                                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                                            </svg>
                                        </div>
                                        <Link
                                            href={isEnglish ? "/" : "/ja"}
                                            className="flex gap-2 items-center"
                                            onClick={closeModal}
                                        >
                                            {/* ロゴ部分 */}
                                            <Logo />
                                            {/* テキスト部分 */}
                                            <div className="font-bold text-xl ">{siteTitle}</div>
                                        </Link>
                                    </div>
                                    <LangButton />
                                </div>
                            </div>
                        </div>
                        <ul
                            className={`menu menu-xl mt-3 p-2 w-auto`}>
                            {
                                links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="c-globalNavigation__categoryLink" onClick={closeModal} >{link.name}</Link>
                                    </li>
                                ))
                            }
                            <li className='mt-2' >
                                <summary aria-disabled="true" style={{ pointerEvents: "none" }}>{isEnglish ? "External" : "外部リンク"}</summary>
                                <ul className="p-2">
                                    {
                                        externalLinks.map((link) => (
                                            <li key={link.href}>
                                                <Link href={link.href} target="_blank" rel="noopener noreferrer" onClick={closeModal} >{link.name} <GoLinkExternal /></Link>

                                            </li>
                                        ))
                                    }
                                </ul>
                            </li>
                        </ul>
                        <div className="flex flex-row-reverse">
                            <button className="btn btn-primary m-2" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </dialog>
            </header>
        </>
    )
}



const Logo = () => (
    <div style={{
        backgroundImage: "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPjxyZWN0IGlkPSLjgqLjg7zjg4jjg5zjg7zjg4kxIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTI3LjU1OSIgaGVpZ2h0PSIxMjcuNTU5IiBzdHlsZT0iZmlsbDpub25lOyIvPjxjbGlwUGF0aCBpZD0iX2NsaXAxIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTI3LjU1OSIgaGVpZ2h0PSIxMjcuNTU5Ii8+PC9jbGlwUGF0aD48ZyBjbGlwLXBhdGg9InVybCgjX2NsaXAxKSI+PGc+PHBhdGggZD0iTTEyNy41NTMsNTYuNjcyYy0xLjQ0MiwtOS43NjIgLTYuMTUxLC0xOC42OTUgLTEzLjIwMywtMjYuMDU2Yy0wLjA0MSwtMC4wMzcgLTAuMDgxLC0wLjA1MiAtMC4xNDQsLTAuMDY0Yy00LjM1NSwtMC42ODcgLTEwLjMzMSwtMC40MzEgLTE3Ljg2MiwxLjk0NWMtMTEuNDU5LDMuNjE3IC0yMy4yMjEsMTUuNTg0IC0yOS42NjMsMjkuMTg3bC0wLjAwMSwtMC4wMDFjLTAuMTY0LDAuMzUxIC0wLjQ3OCwwLjYwNiAtMC45MDQsMC40OTVjLTAuNDE3LC0wLjEwOSAtMC41NjUsLTAuNDc4IC0wLjUzNSwtMC44MjVjMS43ODMsLTIwLjM3MyA4LjA3MywtMzYuODU0IDIzLjA1NywtNDYuMzk0YzAuMDA0LC0wLjAwMiAwLjAwNywtMC4wMDUgMC4wMSwtMC4wMDdjMC4yOTMsLTAuMTg2IDAuMjMxLC0wLjQ2IC0wLjA3NSwtMC41NjljLTcuNTM4LC0yLjU0MiAtMTUuNzk1LC0zLjk0NiAtMjQuNDUzLC0zLjk0NmMtOC42NTgsMCAtMTYuOTE1LDEuNDA0IC0yNC40NTIsMy45NDZjLTAuMzA4LDAuMTA5IC0wLjM2OCwwLjM4MyAtMC4wNzUsMC41NjljMC4wMDMsMC4wMDIgMC4wMDYsMC4wMDUgMC4wMDksMC4wMDdjMTQuOTg0LDkuNTQgMjEuMjczLDI2LjAyIDIzLjA1Nyw0Ni4zOTRjMC4wMzEsMC4zNDYgLTAuMTE4LDAuNzE2IC0wLjUzNSwwLjgyNWMtMC40MjYsMC4xMTEgLTAuNzQsLTAuMTQ0IC0wLjkwNCwtMC40OTVsMCwwLjAwMWMtNi40NDIsLTEzLjYwNCAtMTguMjA0LC0yNS41NyAtMjkuNjY0LC0yOS4xODdjLTcuNTMxLC0yLjM3NyAtMTMuNTA3LC0yLjYzMiAtMTcuODYxLC0xLjk0NWMtMC4wNjUsMC4wMTIgLTAuMTA1LDAuMDI3IC0wLjE0NCwwLjA2NGMtNy4wNTEsNy4zNjEgLTExLjc2MiwxNi4yOTQgLTEzLjIwNCwyNi4wNTZjLTAuMDQ0LDAuMzE2IDAuMTUxLDAuNDYzIDAuNDY5LDAuMzMxYzAuMDAxLC0wLjAwMSAwLjAwMywtMC4wMDEgMC4wMDUsLTAuMDAyYzcuNzIzLC0zLjMxMiAxOS40NjIsLTcuMDMzIDM0Ljc2NSwtNC40NGM4LjUwOSwxLjQ0MSAxNS44NDgsNS40MyAyMi42NTksMTAuNjQ0YzAuMjI3LDAuMjA4IDAuMzQsMC41MzggMC4xNDgsMC44NjVjLTAuMjAyLDAuMzQ2IC0wLjU2OCwwLjQgLTAuOTE0LDAuMjljLTEyLjg5NywtNC4zNTMgLTM2LjEzNCwtMi42OTUgLTU0LjMxLDE1LjA4NWMtMC4wNjEsMC4wNjIgLTAuMDYyLDAuMDk5IC0wLjA0MiwwLjE1NWM0LjE5MiwxMC4zNjggMTIuMjE5LDE5LjI5MiAyMi42OTksMjUuNjc2YzAuMjM4LDAuMTM5IDAuNDE1LDAuMDAzIDAuNDc0LC0wLjI1MWM0LjAwNCwtMjIuMjI1IDIwLjAwNSwtMzUuNzcyIDM3LjgyLC0zNS43NzJjMTcuODE1LDAgMzMuODE2LDEzLjU0NyAzNy44MiwzNS43NzJjMC4wNiwwLjI1NCAwLjIzNywwLjM5IDAuNDc0LDAuMjUxYzEwLjQ4LC02LjM4NCAxOC41MDYsLTE1LjMwOCAyMi42OTksLTI1LjY3NmMwLjAyLC0wLjA1NSAwLjAxOSwtMC4wOTMgLTAuMDQxLC0wLjE1NWMtMTguMTc3LC0xNy43OCAtNDEuNDEyLC0xOS40MzkgLTU0LjMxLC0xNS4wODVjLTAuMzQ1LDAuMTEgLTAuNzEyLDAuMDU3IC0wLjkxNSwtMC4yOWMtMC4xOTMsLTAuMzI4IC0wLjA3OCwtMC42NTcgMC4xNDgsLTAuODY1YzYuODExLC01LjIxNCAxNC4xNTEsLTkuMjAzIDIyLjY2LC0xMC42NDRjMTUuMzAzLC0yLjU5MiAyNy4wNDEsMS4xMjggMzQuNzY1LDQuNDRjMC4wMDEsMC4wMDEgMC4wMDMsMC4wMDEgMC4wMDUsMC4wMDJjMC4zMTgsMC4xMzIgMC41MTMsLTAuMDE1IDAuNDY4LC0wLjMzMSIgc3R5bGU9ImZpbGw6I2JlOWIzOTtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNNjkuMDc5LDczLjgwMWwtMTAuNTk5LDBjLTAuMzY0LDAuMDEyIC0wLjM3OSwwLjIxOSAtMC4zNDMsMC41MzFsNC45MzEsNDIuMTA5YzAuMTA5LDAuOTA3IDEuMzE0LDAuOTA3IDEuNDI0LDBsNC45MywtNDIuMTA5YzAuMDM3LC0wLjMxMiAwLjAyMiwtMC41MTkgLTAuMzQzLC0wLjUzMSIgc3R5bGU9ImZpbGw6Izk1OTk5YjtmaWxsLXJ1bGU6bm9uemVybzsiLz48L2c+PC9nPjwvc3ZnPg==')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        width: '40px',
        height: '40px',

    }} />
)

// export function ExternalPopover({ externalLinks, isEnglish }: any) {
//     const popRef = useRef<HTMLElement | null>(null);

//     const closePopover = () => {
//         // Popover API
//         (popRef.current as any)?.hidePopover?.();
//     };

//     return (
//         <li>
//             <div className="dropdown dropdown-end">
//                 {/* トリガー */}
//                 <button
//                     popoverTarget="ext_pop"
//                     popoverTargetAction="toggle"
//                     type="button"
//                 >
//                     {isEnglish ? "External" : "外部リンク"}
//                 </button>

//                 {/* Popover本体（外側クリック/Escで閉じる） */}
//                 <ul
//                     id="ext_pop"
//                     popover="auto"
//                     ref={(el) => { popRef.current = el; }}
//                     className="dropdown-content menu rounded-box bg-base-100 shadow p-2 mt-10
//                      w-80 max-w-[min(90vw,28rem)] whitespace-normal"
//                     style={{ marginTop: ".8rem" }}
//                     // className="p-2 w-80 max-w-[min(90vw,28rem)] whitespace-normal" 
//                 >
//                     {externalLinks.map((link: any) => (
//                         <li key={link.href}>
//                             <Link
//                                 href={link.href}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 onClick={closePopover}
//                                 className="flex items-start gap-2"
//                             >
//                                 <span className="min-w-0 break-words">{link.name}</span>
//                                 <GoLinkExternal className="shrink-0 mt-1" />
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </li>
//     );
// }