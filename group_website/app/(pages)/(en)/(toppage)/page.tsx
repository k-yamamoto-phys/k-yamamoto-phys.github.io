import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link"
import { FaHome, FaSearch, FaBook, FaArrowRight } from 'react-icons/fa';
import { MetadataGenerator } from "@/app/lib/metadata";
import Acctivity from "@/app/ui/server/acctivity";
import { Crousel, Hero } from "@/app/ui/client/crousel";
import { withBasePath } from "@/app/lib/site-paths";
import { TopPageRelease } from "@/app/ui/server/press_release";


export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`Home`, `Yamamoto group Osaka Metropolitan University, Department of Physics, Graduate School of Science, Non-equilibrium Quantum Many-Body Physics Laboratory`, '/', "en");
}


export default async function Page() {
    return (
        <>
            <Hero figure_path="/images/OMU_photo.png" backgroundPosition="center 70%" isFullScreen>
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] md:text-6xl">Nonequilibrium Many-Body Quantum Matter Theory Group</h1>
                    <p className="mt-8 text-sm font-medium leading-relaxed text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] md:mt-10 md:text-lg">
                        We are studying the theory of nonequilibrium quantum many-body systems at Department of Physics, Osaka Metropolitan University.
                    </p>
                </div>
            </Hero>

            <div className="m-2 p-2">
                <div className="prose mt-6">
                    <h2>Theory of Nonequilibrium Quantum Many-Body Physics at the Interface between Condensed Matter Physics, AMO Physics, and Quantum Information</h2>
                    <p>Our research group conducts theoretical studies in quantum many-body systems, focusing on nonequilibrium physics, statistical mechanics, and quantum information. Recent advances in ultracold atoms have enabled the realization of open quantum systems, where controllable parameters allow access to novel quantum states and nonequilibrium phase transitions. Despite these developments, the role of strong correlation effects under dissipation remains far from fully understood. In collaboration with experimental groups, we investigate nonequilibrium quantum many-body phenomena arising from the interplay between dissipation and strong correlations.</p>
                    <TopPageRelease lang={`en`} />
                    <section className="not-prose my-10 border-l-4 border-primary bg-primary/10 px-5 py-5 shadow-sm md:px-7">
                        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Students and Postdocs</p>
                        <h2 className="mt-2 text-2xl font-bold leading-snug text-gray-900">We welcome motivated students and postdocs</h2>
                        <p className="mt-3 leading-relaxed text-gray-800">
                            We are always looking for motivated students and postdocs. To join our group as a student, you need to apply for <a href={`https://www.omu.ac.jp/sci/en/international_course/`} className="text-secondary underline" target="_blank" rel="noopener noreferrer">admission to Department of Physics, Osaka Metropolitan University</a>.
                            We also support a postdoc application for <a href={`https://www.jsps.go.jp/english/e-ippan/index.html`} className="text-secondary underline" target="_blank" rel="noopener noreferrer">JSPS fellowship</a>. 
                        </p>
                        {/* <div className="mt-5">
                            <Link href="/contact" className="btn btn-primary text-white">Contact us<FaArrowRight /></Link>
                        </div> */}
                    </section>

                    <h2>Recent Activities</h2>
                    <Acctivity lang={"en"} limit={5} /> <br />
                    <Link href="/activities" className="btn btn-primary  text-white">More activities<FaArrowRight /></Link>
                </div>
            </div>
        </>
    );
}
