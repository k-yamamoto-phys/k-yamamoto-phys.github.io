"use client";

import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { useAtomValue } from "jotai";
import { EngAtom } from "@/app/lib/atom";
import { siteMetadata } from "@/group/_metadata";

export default function Footer() {
  const isEnglish = useAtomValue(EngAtom);
  const year = new Date().getFullYear();
  const links = isEnglish
    ? siteMetadata.Navigation.en
    : siteMetadata.Navigation.ja;

  const featuredLinks = links.filter(({ href }) =>
    ["/", "/research", "/members", "/access", "/ja/", "/ja/research", "/ja/members", "/ja/access"].includes(href),
  );

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-primary/25 bg-base-200 text-base-content">
      <div aria-hidden="true" className="absolute -right-24 -top-28 h-72 w-72 rounded-full border-[42px] border-primary/10" />
      {/* <div aria-hidden="true" className="absolute right-28 top-12 h-3 w-3 rounded-full bg-secondary/40" /> */}

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <div className="mb-5 h-1 w-12 rounded-full bg-primary" />
          <p className="text-xl font-bold tracking-tight">
            {isEnglish ? siteMetadata.SiteTitle.en : siteMetadata.SiteTitle.ja}
          </p>
          <p className="mt-3 max-w-md text-sm leading-7 text-base-content/70">
            {isEnglish
              ? "Nonequilibrium Many-Body Quantum Matter Theory"
              : "非平衡量子多体物性理論"}
          </p>
        </div>

        <nav aria-label={isEnglish ? "Footer navigation" : "フッターナビゲーション"}>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            {isEnglish ? "Explore" : "サイト案内"}
          </p>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm">
            {featuredLinks.map((link) => (
              <li key={link.href}>
                <Link className="inline-block py-1 text-base-content/75 transition-colors hover:text-primary" href={link.href}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            {isEnglish ? "Affiliation" : "所属"}
          </p>
          <a
            className="group inline-flex items-start gap-1.5 text-sm leading-6 text-base-content/75 transition-colors hover:text-primary"
            href={isEnglish ? "https://www.omu.ac.jp/en/" : "https://www.omu.ac.jp/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{isEnglish ? siteMetadata.organization.en : siteMetadata.organization.ja}</span>
            <GoArrowUpRight className="mt-1 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="relative border-t border-base-content/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-base-content/55 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>© {year} {siteMetadata.SiteTitle.en}</p>
          <p>{isEnglish ? "Osaka Metropolitan University" : "大阪公立大学"}</p>
        </div>
      </div>
    </footer>
  );
}
