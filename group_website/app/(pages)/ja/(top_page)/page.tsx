import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link"
import { FaHome, FaSearch, FaBook, FaArrowRight } from 'react-icons/fa';
import { MetadataGenerator } from "@/app/lib/metadata";
import Acctivity from "@/app/ui/server/acctivity";
import { Crousel, Hero } from "@/app/ui/client/crousel";
import { siteMetadata } from "@/group/_metadata";
export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`ホーム`, `大阪公立大学理学部物理学科/大学院理学研究科物理学専攻　物性物理学講座　非平衡量子多体研究室`, '/ja/', "ja");
}

export default async function Page() {
    return (
        <>
            <Hero figure_path="/images/top.jpg" isFullScreen>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold md:text-6xl">非平衡量子多体研究室</h1>
                    <p className="text-sm md:text-lg mt-5">
                        大阪公立大学理学部物理学科/大学院理学研究科物理学専攻 物性物理学講座 非平衡量子多体研究室のホームページへようこそ。（適当に変える）
                    </p>
                </div>
            </Hero>

            <div className="m-2 p-2">
                <div className="prose mt-6">
                    <h2>研究の興味: 情報科学と物質科学の融合による非平衡開放系の強相関物理の理論</h2>
                    <p>強い相互作用を持つ量子系である強相関系に興味を持って研究を行っています。特にその中でも、極低温に冷却された原子集団である冷却原子系などを対象として、散逸の存在する量子開放系の物理を扱った研究を行っています。冷却原子系における実験技術の発展は目覚ましく、系のパラメータの自在な制御に加え、散逸の制御や１原子レベルでの観測をも可能にしました。近年、こうした観測の反作用・粒子ロスなどの散逸を利用して、開放系特有の量子状態や、量子力学的な情報量の非平衡相転移などを実現できることがわかってきています。その一方で、物理に多様性をもたらす強相関効果が、散逸の下でどのような豊かな非平衡現象を誘起するのかといった問題は系統的理解からは程遠いのが現状です。私はこのような背景の下、散逸と強相関効果の協奏で発現する非平衡現象を探究することを目的としています。</p>
                    <div className="card sm:card-side bg-white shadow-sm  ">
                        <img
                            src="/images/top_page/measurement.png"
                            className="w-64 object-contain mx-auto pl-2"
                            style={{ marginTop: "1em", marginBottom: "1em" }}
                            alt="測定" />
                        <div className="card-body pt-0 sm:pt-4">
                            <h2 className="card-title mt-6 block"><div className="badge badge-info relative -top-0.5">最近の研究</div>&nbsp;<span className="inline">量子測定が誘起する多体物理の新たな普遍性の解明</span></h2>
                            <p>近年、測定の反作用によって引き起こされる孤立系には存在しない新しい物理現象が次々と報告され、凝縮系物理・統計力学・原子物理・量子情報などの幅広い分野から注目を集めています。我々は量子多体系における測定の反作用がもたらす部分系の揺らぎのダイナミクスを理論的に解析することで、実験的にも低コストで実現可能な、新たな普遍性をもつ測定誘起多体効果が現れることを明らかにしました。</p>
                            <div className="card-actions justify-end">
                                <Link href="/ja/research" className="btn btn-primary  text-white">研究の詳細へ<FaArrowRight /></Link>
                            </div>
                        </div>
                    </div>

                    <h2>最近の活動</h2>
                    <Acctivity lang={"ja"} limit={5} /> <br />
                    <Link href="/ja/activities" className="btn btn-primary  text-white">一覧へ<FaArrowRight /></Link>
                </div>
            </div>
        </>
    );
}