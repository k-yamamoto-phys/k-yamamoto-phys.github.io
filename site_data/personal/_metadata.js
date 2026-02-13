export const siteMetadata = {
    publicURL: "https://k-yamamoto-phys.github.io",
    name: {
        en: "Kazuki Yamamoto",
        ja: "山本 和樹"
    },
    organization: {
        ja: "東京科学大学　理学院　物理学系　古賀研究室",
        en: "Department of physics, Institute of Science Tokyo"
    },
    SiteTitle: {
        en: "Kazuki Yamamoto",
        ja: "山本 和樹"
    },
    homeCrousel: [// 画像は、personal_website/public以下に置くことで変えることができます。
        { 
            image: "/images/cj1.jpg",
            caption: {
                ja: "Prof. Werner, Mithilesh, Dr. Nayak, Dr. Rayとのpizzeriaでの夕食",
                en: "Dinner at a pizzeria with Prof. Werner, Mithilesh, Dr. Nayak, and Dr. Ray"
            }
        },
        { 
            image: "/images/cj2.jpg",
            caption: {
                ja: "Évora, PortugalにてProf. Tomaz Prosenと",
                en: "With Prof. Tomaz Prosen @ Évora, Portugal"
            }
        },
        {
            image: "/images/cj3.jpg",
            caption: {
                ja: "Miramare castle (Trieste, Italy)にて",
                en: "Photo @ Miramare castle (Trieste, Italy)"
            }
        },
        {
            image: "/images/cj4.jpg",
            caption: {
                ja: "AmsterdamのMiffy",
                en: "Miffy @ Amsterdam"
            }
        }
    ],
    Navigation: {
        en: [
            {
                name: "Home",
                href: "/",
            },
            {
                name: "Research",
                href: "/research",
            },
            {
                name: "Publications",
                href: "/publications",
            },
            {
                name: "Presentations",
                href: "/presentations",
            },
            {
                name: "CV",
                href: "/cv",
            }
        ],
        ja: [
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
        ]
    },
    ExternalLinks: {
        en: [
            {
                name: "Science Tokyo",
                href: "https://www.isct.ac.jp/en",
            },
            {
                name: "Dept. of Phys.",
                href: "https://educ.titech.ac.jp/phys/eng/"
            },
            {
                name: "Koga Lab.",
                href: "http://www.stat.phys.titech.ac.jp/koga/index-e.html"
            },
            {
                name: "Cond. Theo. Kyoto Univ.",
                href: "https://cond.scphys.kyoto-u.ac.jp/e_index.html"
            }
        ],
        ja: [
            {
                name: "Science Tokyo",
                href: "https://www.isct.ac.jp/ja",
            },
            {
                name: "物理学系",
                href: "https://educ.titech.ac.jp/phys/"
            },
            {
                name: "古賀研究室",
                href: "http://www.stat.phys.titech.ac.jp/koga/"
            },
            {
                name: "京大凝縮系理論",
                href: "http://cond.scphys.kyoto-u.ac.jp/"
            }
        ]
    },
    noEnglish: ["/ja/amuse", "/not-found"]
}