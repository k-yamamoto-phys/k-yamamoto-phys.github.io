"use client";
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image'
import { DarkModeButton } from '../client_ui/darkModeButton';

const linkTitleEn = [
    {
        name: "Home",
        href: "/en/",
    },
    {
        name: "Research",
        href: "/en/research",
    },
    {
        name: "Publications",
        href: "/en/publications",
    }, 
    {
        name: "Presentations",
        href: "/en/presentations",
    },
    {
        name: "CV",
        href: "/en/cv",
    }
];
const linkTitleJa = [
    {
        name: "ホーム",
        href: "/ja/",
    },
    {
        name: "研究",
        href: "/ja/research",
    },
    {
        name: "出版物",
        href: "/ja/publications",
    },
    {
        name: "発表",
        href: "/ja/presentations",
    },
    {
        name: "CV",
        href: "/ja/cv",
    },
    {
        name: "徒然なるままに",
        href: "/ja/amuse",
    }
];

export const NavBar: React.FC = () => {
    const pathname = usePathname();
    const locale = pathname.split("/")[1]; 
    const links = locale === "ja" ? linkTitleJa : linkTitleEn;
    return (
        <>
        <nav className="bg-cyan-700 dark:bg-cyan-950">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <Link href="/" className='flex items-center space-x-3 rtl:space-x-reverse '>
                    {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span> */}
                </Link>
                <DarkModeButton/>
                <ul className="hidden sm:flex font-medium p-0 border border-gray-100  bg-gray-50 flex-row space-x-8 rtl:space-x-reverse mt-0 border-0 bg-white dark:bg-gray-800 dark:bg-gray-900 dark:border-gray-700">
                    {links.map(l => (
                        <li key={l.name}>
                            <Link href={l.href} className={clsx({ "text-blue-700 dark:text-blue-500": pathname === l.href, "text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-600": pathname !== l.href }, "block py-2 px-3 p-0")} aria-current="page">
                                {l.name}
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
        </nav>
        {/* <div className='w-full h-12 hidden sm:block'></div> */}
        </>
    );
};


export const BottomNav: React.FC = () => {
    const pathname = usePathname();
    const locale = pathname.split("/")[1];
    const links = locale === "ja" ? linkTitleJa : linkTitleEn;
    return (
        <>        <div className="fixed bottom-0 left-0 w-full shadow-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-600 flex justify-around items-center h-16 sm:hidden">
            {
                links.map(l => (
                    <Link key={l.name} href={l.href} className={clsx({ 'text-gray-600 dark:text-white': pathname !== l.href }, { 'text-blue-500 dark:blue-600': pathname == l.href }, "grow flex flex-col items-center")}>
                        <span className="text-xs">{l.name}</span>
                    </Link>
                ))
            }
        </div>
        <div className='w-full h-16 sm:hidden'></div>
        </>
    );
};
