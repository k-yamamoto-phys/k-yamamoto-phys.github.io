import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link"
import { FaHome, FaSearch, FaBook, FaArrowRight } from 'react-icons/fa';
import { MetadataGenerator } from "@/app/lib/metadata";
import Acctivity from "@/app/ui/server/acctivity";
import { Crousel, Hero } from "@/app/ui/client/crousel";
import { withBasePath } from "@/app/lib/site-paths";


export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`Home`, `Yamamoto group Osaka Metropolitan University, Department of Physics, Graduate School of Science, Non-equilibrium Quantum Many-Body Physics Laboratory`, '/', "en");
}


export default async function Page() {
    return (
        <>
            <Hero figure_path="/images/top.jpg" isFullScreen>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold md:text-6xl">Yamamoto group</h1>
                    <p className="text-sm md:text-lg mt-5">
                        We study the theory of non-equilibrium quantum many-body systems in the Condensed Matter Physics Group, Department of Physics, Osaka Metropolitan University.
                    </p>
                </div>
            </Hero>

            <div className="m-2 p-2">
                <div className="prose mt-6">
                    <h2>Research Interests: Theory of Nonequilibrium Quantum Many-Body Physics through the Fusion of Condensed Matter Physics, AMO Physics, and Quantum Information</h2>
                    <p>I am interested in strongly correlated phenomena in condensed matter physics, particularly in open quantum systems with ultracold atoms. Recently, I am working on many-body physics by using both analytical and numerical methods, such as Bethe ansatz, conformal field theory, and (non-Hermitian generalization of) density-matrix renormalization group analysis.</p>
                    <div className="card sm:card-side bg-white shadow-sm  ">
                        <img
                            src={withBasePath("/images/top_page/measurement.png")}
                            className="w-64 object-contain mx-auto pl-2"
                            style={{ marginTop: "1em", marginBottom: "1em" }}
                            alt="Measurement" />
                        <div className="card-body pt-0 sm:pt-4">
                            <h2 className="card-title mt-6 block"><div className="badge badge-info relative -top-0.5">Recent Research</div>&nbsp;<span className="inline">Novel Many-Body Measurement-Induced Universality</span></h2>
                            <p>Recently, quantum measurement has attracted great attention as it causes drastic nonequilibrium quantum phenomena such as in condensed matter physics and quantum information sciences. We have revealed that subsystem fluctuations in many-body systems can exhibit novel measurement-induced universality and are accessed in experiments without postselection.</p>
                            <div className="card-actions justify-end">
                                <Link href="/research" className="btn btn-primary  text-white">Details<FaArrowRight /></Link>
                            </div>
                        </div>
                    </div>

                    <section className="not-prose my-10 border-l-4 border-primary bg-primary/10 px-5 py-5 shadow-sm md:px-7">
                        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Students and Postdocs</p>
                        <h2 className="mt-2 text-2xl font-bold leading-snug text-gray-900">We welcome motivated students and postdocs</h2>
                        <p className="mt-3 leading-relaxed text-gray-800">
                            We are always looking for motivated students and postdocs who belong to Department of Physics, Osaka Metropolitan University.
                            If you are interested, please contact me for further information.
                        </p>
                        <div className="mt-5">
                            <Link href="/contact" className="btn btn-primary text-white">Contact us<FaArrowRight /></Link>
                        </div>
                    </section>

                    <h2>Recent Activities</h2>
                    <Acctivity lang={"en"} limit={5} /> <br />
                    <Link href="/activities" className="btn btn-primary  text-white">More activities<FaArrowRight /></Link>
                </div>
            </div>
        </>
    );
}
