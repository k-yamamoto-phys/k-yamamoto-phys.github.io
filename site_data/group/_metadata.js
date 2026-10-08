const DEFAULT_PUBLIC_URL = "https://kazuki-yamamoto.github.io/group";

function normalizePublicURL(value) {
    const trimmed = (value ?? "").trim().replace(/\/+$/, "");
    return trimmed || DEFAULT_PUBLIC_URL;
}

const publicURL = normalizePublicURL(process.env.NEXT_PUBLIC_GROUP_PUBLIC_URL ?? DEFAULT_PUBLIC_URL);

export const siteMetadata = {
    // 全ページのヘッダー直下に表示。空文字の場合は非表示。
    // type: "info"（緑）または "warning"（赤）。text は Markdown。
    // 例: ja: "**お知らせ**: [詳細はこちら](/ja/research)"
    SiteMessage: {
        type: "warning",
        text: {
            ja: "[**大阪公立大学基盤システムの障害**](https://e.omu.ac.jp/)により，メール・ネットワークを含む全てのシステムがダウンしています。当面の間，山本講師への連絡は[oyakatamaron@gmail.com]までお願いいたします。 &#x20;",
            en: "OMU core system is down, including emails and networks. Please contact Prof. Yamamoto via [oyakatamaron@gmail.com]"
        }
    },
    publicURL,
    name: {
        en: "Kazuki Yamamoto",
        ja: "山本 和樹"
    },
    organization: {
        ja: "大阪公立大学　大学院理学研究科物理学専攻",
        en: "Department of physics, Osaka Metropolitan University"
    },
    SiteTitle: {
        en: "Yamamoto group",
        ja: "山本グループ"
    },
    all_member_img: "/images/members/all/2026.jpg",
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
                name: "Members",
                href: "/members",
            },
            {
                name: "Activities",
                href: "/activities",
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
                name: "Access",
                href: "/access",
            // },
            // {
            //     name: "Personal page",
            //     href: "https://k-yamamoto-phys.github.io",
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
                name: "メンバー",
                href: "/ja/members",
            },
            {
                name: "最近の活動",
                href: "/ja/activities",
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
                name: "アクセス",
                href: "/ja/access",
            // },
            // {
            //     name: "個人ページ",
            //     href: "https://k-yamamoto-phys.github.io/ja",
            }
        ]
    },
    ExternalLinks: {
        en: [
            {
                name: "Osaka Metropolitan University",
                href: "https://www.omu.ac.jp/en",
            },
            {
                name: "Condensed Matter Devision",
                href: "https://www.omu.ac.jp/sci/phys_en/research/condensedmatter.html"
            }
        ],
        ja: [
            {
                name: "大阪公立大学",
                href: "https://www.omu.ac.jp/",
            },
            {
                name: "物性物理学講座",
                href: "https://www.omu.ac.jp/sci/phys/kouza/condensedmatter.html"
            }
        ]
    },
    noEnglish: ["/not-found"]
}
