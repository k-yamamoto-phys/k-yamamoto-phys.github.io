import type { Metadata } from "next";
import Link from "next/link";
import { MetadataGenerator } from "@/app/lib/metadata";
import Acctivity from "@/app/ui/server/acctivity";
import GroupLinkCard from "@/app/ui/server/groupLinkCard";
import { FaArrowRight } from "react-icons/fa";
import { Crousel } from "@/app/ui/client/crousel";
import { siteMetadata } from "@/personal/_metadata";

export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(
        `Homepage`,
        `Dr. Kazuki Yamaomoto's personal website`,
        '/',
    );
}
export default async function Page() {
    return (
        <>
            <Crousel crousels={[{ image: "/images/top.jpg", caption: "Varenna, Lake Como" }]} />
            <div className="m-2 p-2">
                <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-center md:gap-8">
                    <div className="prose min-w-0 flex-1">
                        <div className="not-prose max-w-xl">
                            <h1 className="text-4xl font-bold tracking-tight text-base-content sm:text-5xl">Dr. Kazuki Yamamoto</h1>
                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-base-content">
                                <span>Ph.D. (Science)</span>
                                <span className="text-base-content/35" aria-hidden="true">/</span>
                                <span>Assistant Professor</span>
                            </div>
                            <p className="mt-2 text-lg leading-relaxed text-base-content">
                                Department of Physics, Osaka Metropolitan University
                            </p>
                            <p className="break-words text-base leading-relaxed text-base-content">
                                <span className="font-semibold">Email:</span> kazuki-yamamoto + [atmark] + omu.ac.jp
                            </p>
                            <img src="/images/OMU_logo_en.png" alt="Osaka Metropolitan University" className="my-4 w-48 md:w-64" />
                        </div>

                    </div>
                    <div className="mx-auto mt-3 w-2/3 shrink-0 md:mx-0 md:w-1/3">
                        <Crousel crousels={siteMetadata.homeCrousel.map(c => ({ image: c.image, caption: c.caption.en }))} />
                    </div>
                </div>
                <GroupLinkCard lang="en" />
                <div className="prose ">
                    <h2>Research Interests: Theory of Nonequilibrium Quantum Many-Body Physics at the Interface between Condensed Matter Physics, AMO Physics, and Quantum Information</h2>
                    <p>I am interested in strongly correlated phenomena in condensed matter physics, particularly in open quantum systems with ultracold atoms. Recently, I am working on many-body physics by using both analytical and numerical methods, such as Bethe ansatz, conformal field theory, and (non-Hermitian generalization of) density-matrix renormalization group analysis.
                    </p>
                    {/* <p>
                        We are always looking for motivated students and postdocs who belong to Department of Physics, Osaka Metropolitan University. If you are interested, please contact me for further information.
                    </p> */}
                    <div className="card sm:card-side bg-white shadow-sm  ">
                        <img
                            src="/images/top_page/measurement.png"
                            className="w-64 object-contain mx-auto pl-2"
                            style={{ marginTop: "1em", marginBottom: "1em" }}
                            alt="測定" />
                        <div className="card-body pt-0 sm:pt-4">
                            <h2 className="card-title mt-6 block"><div className="badge badge-info relative -top-0.5">Recent Research</div>&nbsp;<span className="inline">Novel Many-Body Measurement-Induced Universality</span></h2>
                            <p>Recently, quantum measurement has attracted great attention as it causes drastic nonequilibrium quantum phenomena such as in condensed matter physics and quantum information sciences. We have revealed that subsystem fluctuations in many-body systems can exhibit novel measurement-induced universality and are accessed in experiments without postselection.</p>
                            <div className="card-actions justify-end">
                                <Link href="/research" className="btn btn-primary  text-white">Details<FaArrowRight /></Link>
                            </div>
                        </div>
                    </div>

                    <h2>What's New</h2>
                    <Acctivity lang={"en"} limit={5} />
                    <Link href="/news" className="btn btn-primary text-white">More news<FaArrowRight /></Link>
                    {/* <h2>Links</h2>
                    <ul>
                        <li><a href="http://www.stat.phys.titech.ac.jp/koga/" >Tokyo Institute of Technology Koga Laboratory</a></li>
                        <li><Link href="http://cond.scphys.kyoto-u.ac.jp/">Kyoto University Condensed Matter Theory Group</Link></li>
                    </ul> */}
                    <h2>Talk in APCTP (Click the Youtube button on the right side)</h2>
                    <iframe className="aspect-video w-full" src="https://www.youtube.com/embed/4kMetRPztq0?si=zW0-CWha9fEJ7BoW" title="YouTube video player"    ></iframe>
                </div >
            </div >
        </>
    );
}
