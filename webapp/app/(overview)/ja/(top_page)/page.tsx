import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link"
import { FaArrowRight } from 'react-icons/fa';
import { MetadataGenerator } from "@/app/lib/metadata";
import Activity from "@/app/ui/server/activity";
import { Carousel } from "@/app/ui/client/carousel";
import { siteMetadata } from "@/app/site_data/_metadata";
export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
    return MetadataGenerator(`ホーム`, `山本和樹のホームページ`);
}

export default async function Page() {
    return (
        <>
            <Carousel carousels={[{ image: "/images/top.jpg", caption: "Varenna, Lake Como" }]} />
            <div className="m-2 p-2">
                <div className="flex flex-col md:flex-row justify-between  mb-6">
                    <div className="prose">
                        <h1>山本和樹</h1>
                        <p>博士 (理学)</p>
                        <p>助教</p>
                        <p>東京科学大学(旧東京工業大学)理学院物理学系(古賀研究室)</p>
                        <p>連絡先</p>
                        <ul>
                            <li>Email: yamamoto + アットマーク + phys.sci.isct.ac.jp </li>
                        </ul>
                    </div>
                    <div className="md:w-1/3 w-2/3 mt-3">
                        <Carousel carousels={siteMetadata.homeCrousel.map(c => ({ image: c.image, caption: c.caption.ja }))} />
                    </div>
                </div>
                <div className="prose ">
                <h2>研究の興味</h2>
                <h3>情報科学と物質科学の融合による非平衡量子多体物理の理論</h3>
                <p>私は強い相互作用を持つ量子系である強相関系に興味を持って研究を行っています。特にその中でも、極低温に冷却された原子集団である冷却原子系などを対象として、散逸の存在する量子開放系の物理を扱った研究を行っています。冷却原子系における実験技術の発展は目覚ましく、系のパラメータの自在な制御に加え、散逸の制御や１原子レベルでの観測をも可能にしました。近年、こうした観測の反作用・粒子ロスなどの散逸を利用して、開放系特有の量子状態や、量子力学的な情報量の非平衡相転移などを実現できることがわかってきています。その一方で、物理に多様性をもたらす強相関効果が、散逸の下でどのような豊かな非平衡現象を誘起するのかといった問題は系統的理解からは程遠いのが現状です。私はこのような背景の下、散逸と強相関効果の協奏で発現する非平衡現象を探究することを目的としています。</p>
                <h3>量子測定が誘起する多体物理の新たな普遍性の解明</h3>
                <p>近年、測定の反作用によって引き起こされる孤立系には存在しない新しい物理現象が次々と報告され、凝縮系物理・統計力学・原子物理・量子情報などの幅広い分野から注目を集めています。我々は量子多体系における測定の反作用がもたらす部分系の揺らぎのダイナミクスを理論的に解析することで、実験的にも低コストで実現可能な、新たな普遍性をもつ測定誘起多体効果が現れることを明らかにしました。</p>
                    <Link href="/ja/research" className="btn btn-primary  text-white">研究の詳細へ<FaArrowRight /></Link>

                <h2>最近の活動</h2>
                <Activity lang={"ja"} limit={5} /> <br />
                    <Link href="/ja/news" className="btn btn-primary  text-white">一覧へ<FaArrowRight /></Link>
                <h2>リンク</h2>
                <ul>
                    <li><a href="http://www.stat.phys.titech.ac.jp/koga/" >東京工業大学古賀研究室</a></li>
                    <li><Link href="http://cond.scphys.kyoto-u.ac.jp/">京都大学凝縮系理論グループ</Link></li>
                </ul>
                <h2>韓国のAPCTPにおける講演のYoutube 動画
                </h2>
                <iframe  className="aspect-video w-full" src="https://www.youtube.com/embed/4kMetRPztq0?si=zW0-CWha9fEJ7BoW" title="YouTube video player"    ></iframe>
                </div>
            </div>
        </>
    );
}