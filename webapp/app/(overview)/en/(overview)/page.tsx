import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link";
import { MetadataGenerator } from "@/app/lib/metadata";
import Acctivity from "@/app/ui/server/acctivity";
import { FaArrowRight } from "react-icons/fa";
import { Crousel } from "@/app/ui/client/crousel";

export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(
        `Home`,
        `Dr. Kazuki Yamaomoto's personal website`
    );
}
import { siteMetadata } from "@/app/site_data/_metadata";
export default async function Page() {
    return (
        <>
            <Crousel crousels={[{ image: "/images/top.jpg", caption: "Varenna, Lake Como" }]} />
            <div className="m-2 p-2">
                <div className="flex flex-col md:flex-row justify-between  mb-6">
                    <div className="prose">
                        <h1>Dr. Kazuki Yamamoto</h1>
                        <p>Ph.D. (Science)</p>
                        <p>Assistant Professor</p>
                        <p>Department of Physics, Institute of Science Tokyo (Formerly Tokyo Institute of Technology)</p>
                        <img src="/images/science_tokyo_logo.jpg" alt="Science Tokyo Logo" className="w-48 md:w-64 my-3" />
                        <p>Email: yamamoto + [atmark] + phys.sci.isct.ac.jp</p>
                    </div>
                    <div className="md:w-1/3 w-2/3 mt-3">
                        <Crousel crousels={siteMetadata.homeCrousel.map(c => ({ image: c.image, caption: c.caption.en }))} />
                    </div>
                </div>
                <div className="prose ">
                    <h2>Research Interests: Theory of Nonequilibrium Quantum Many-Body Physics through the Fusion of Information Science and Material Science</h2>
                    <p>I am interested in strongly correlated phenomena in condensed matter physics, particularly in open quantum systems with ultracold atoms. Recently, I am working on many-body physics by using both analytical and numerical methods, such as Bethe ansatz, conformal field theory, and (non-Hermitian generalization of) density-matrix renormalization group analysis.</p>
                    <div className="card sm:card-side bg-white shadow-sm  ">
                        <img
                            src="/images/top_page/measurement.png"
                            className="w-64 object-contain mx-auto pl-2"
                            style={{ marginTop: "1em", marginBottom: "1em" }}
                            alt="測定" />
                        <div className="card-body pt-0 sm:pt-4">
                            <h2 className="card-title mt-6 block"><div className="badge badge-secondary relative -top-0.5">Recent Research</div>&nbsp;<span className="inline">Novel Many-Body Measurement-Induced Universality</span></h2>
                            <p>Recently, quantum measurement has attracted great attention as it causes drastic nonequilibrium quantum phenomena such as in condensed matter physics and quantum information sciences. We have revealed that subsystem fluctuations in many-body systems can exhibit novel measurement-induced universality and are accessed in experiments without postselection.</p>
                            <div className="card-actions justify-end">
                                <Link href="/en/research" className="btn btn-primary  text-white">Details<FaArrowRight /></Link>
                            </div>
                        </div>
                    </div>

                    <h2>What's New</h2>
                    <Acctivity lang={"en"} limit={5} />
                    <Link href="/en/news" className="btn btn-primary text-white">More news<FaArrowRight /></Link>
                    {/* <h2>Links</h2>
                    <ul>
                        <li><a href="http://www.stat.phys.titech.ac.jp/koga/" >Tokyo Institute of Technology Koga Laboratory</a></li>
                        <li><Link href="http://cond.scphys.kyoto-u.ac.jp/">Kyoto University Condensed Matter Theory Group</Link></li>
                    </ul> */}
                    <h2>Talk in APCTP (Click the Youtube button on the right side)</h2>
                    <iframe className="aspect-video w-full" src="https://www.youtube.com/embed/4kMetRPztq0?si=zW0-CWha9fEJ7BoW" title="YouTube video player"    ></iframe>
                </div>
            </div>
        </>
    );
}