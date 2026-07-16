import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link"
import { FaHome, FaSearch, FaBook, FaArrowRight } from 'react-icons/fa';
import { MetadataGenerator } from "@/app/lib/metadata";
import Acctivity from "@/app/ui/server/acctivity";
import { Crousel, Hero } from "@/app/ui/client/crousel";
import { withBasePath } from "@/app/lib/site-paths";
import { TopPageRelease } from "@/app/ui/server/press_release";


export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`ホーム`, `大阪公立大学理学部物理学科/大学院理学研究科物理学専攻　物性物理学講座　非平衡量子多体研究室`, '/ja/', "ja");
}

export default async function Page() {
    return (
        <>
            <Hero figure_path="/images/OMU_photo.png" backgroundPosition="center 70%" isFullScreen>
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl font-extrabold leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] sm:text-4xl md:text-6xl">
                        <span className="inline-block">非平衡量子多体物性理論</span>
                        <span className="inline-block">研究室</span>
                    </h1>
                    <p className="mt-8 text-sm font-medium leading-relaxed text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] md:mt-10 md:text-lg">
                        大阪公立大学 大学院理学研究科物理学専攻 物性物理学講座において、非平衡量子多体系の理論研究に取り組んでいます。
                    </p>
                </div>
            </Hero>

            <div className="m-2 p-2">
                <div className="prose mt-6">
                    <h2>情報科学と物質科学の境界領域における非平衡開放系の強相関物理の理論</h2>
                    <p>当研究室では量子多体系における非平衡物理や統計力学、量子情報に興味をもって物性物理の理論研究をしています。近年、極低温に冷却された原子集団である冷却原子系などにおいて、散逸の存在する量子開放系が実現されました。特に最近では、パラメータの自在な制御によって、開放系特有の量子状態や、量子力学的な情報量の非平衡相転移などを実現できることがわかってきています。その一方で、物理に多様性をもたらす強相関効果が、散逸の下でどのような豊かな非平衡現象を誘起するのかといった問題は系統的理解からは程遠いのが現状です。このような背景の下、実験グループとも密接に連携しながら、散逸と強相関効果の協奏で発現する非平衡量子多体現象を研究しています。</p>
                    <TopPageRelease lang={`ja`} />

                    <section className="not-prose my-10 border-l-4 border-primary bg-primary/10 px-5 py-5 shadow-sm md:px-7">
                        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Students and Postdocs</p>
                        <h2 className="mt-2 text-2xl font-bold leading-snug text-gray-900">卒研生・大学院生・PDを募集しています</h2>
                        <p className="mt-3 leading-relaxed text-gray-800">
                            大阪公立大学大学院理学研究科・非平衡量子多体物性理論研究室にて卒研生・大学院生を募集しています。
                            ご興味のある方はお気軽にメールでご連絡ください。<a href={`https://www.jsps.go.jp/j-pd/pd_sin.html`} className="text-secondary underline" target="_blank" rel="noopener noreferrer">学振PD</a>も受け入れ可能です。
                        </p>
                        {/* <div className="mt-5">
                            <Link href="/ja/contact" className="btn btn-primary text-white">連絡先を見る<FaArrowRight /></Link>
                        </div> */}
                    </section>

                    <h2>最近の活動</h2>
                    <Acctivity lang={"ja"} limit={5} /> <br />
                    <Link href="/ja/activities" className="btn btn-primary  text-white">一覧へ<FaArrowRight /></Link>
                </div>
            </div>
        </>
    );
}
