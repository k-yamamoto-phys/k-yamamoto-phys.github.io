import fs from "node:fs";
import path from "node:path";
import { createCanvas, Image, registerFont } from "canvas";

export const OGPwidth = 1200;
export const OGPheight = 630;

export type OGPLanguage = "ja" | "en";

const utilityDirectory = path.join(process.cwd(), "app/lib/ogp_utility");
const publicDirectory = path.join(process.cwd(), "public");
const outputDirectory = path.join(publicDirectory, "ogp/generated");

const japanesePageNames: Record<string, string> = {
    home: "ホーム",
    research: "研究",
    project: "プロジェクト",
    access: "アクセス",
    activities: "最近の活動",
    members: "メンバー",
    publications: "出版物",
    presentations: "発表",
    "not-found": "ページが見つかりません（404）",
};

registerFont(path.join(utilityDirectory, "NotoSansJP-Bold.ttf"), {
    family: "Noto Sans JP",
    weight: "bold",
});
registerFont(path.join(utilityDirectory, "NotoSansJP-Regular.ttf"), {
    family: "Noto Sans JP",
    weight: "normal",
});

function fileNameFor(pagePath: string, lang: OGPLanguage) {
    const slug = pagePath
        .replace(/^\/+|\/+$/g, "")
        .replace(/^ja(?:\/|$)/, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "home";

    return `${lang}-${slug}.png`;
}

export function resolvePageTitle(title: string, pagePath: string, lang: OGPLanguage) {
    const suppliedTitle = title.trim();
    if (suppliedTitle) return suppliedTitle;

    const slug = pagePath.replace(/^\/+|\/+$/g, "").split("/").pop() || "home";
    if (lang === "ja") return japanesePageNames[slug] ?? slug;

    return slug
        .split(/[-_]+/)
        .filter(Boolean)
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(" ") || "Home";
}

function drawCoverImage(
    context: ReturnType<ReturnType<typeof createCanvas>["getContext"]>,
    image: Image,
) {
    const scale = Math.max(OGPwidth / image.width, OGPheight / image.height);
    const width = image.width * scale;
    const height = image.height * scale;
    context.drawImage(image, (OGPwidth - width) / 2, (OGPheight - height) / 2, width, height);
}

function wrapText(
    context: ReturnType<ReturnType<typeof createCanvas>["getContext"]>,
    text: string,
    maxWidth: number,
    lang: OGPLanguage,
) {
    const units = lang === "ja" ? Array.from(text) : text.split(/\s+/);
    const separator = lang === "ja" ? "" : " ";
    const lines: string[] = [];
    let line = "";

    for (const unit of units) {
        const candidate = line ? `${line}${separator}${unit}` : unit;
        if (line && context.measureText(candidate).width > maxWidth) {
            lines.push(line);
            line = unit;
        } else {
            line = candidate;
        }
    }
    if (line) lines.push(line);

    return lines;
}

function titleLayout(
    context: ReturnType<ReturnType<typeof createCanvas>["getContext"]>,
    title: string,
    lang: OGPLanguage,
) {
    const maxWidth = 950;
    const minimumFontSize = lang === "ja" ? 46 : 44;

    for (let fontSize = lang === "ja" ? 72 : 68; fontSize >= minimumFontSize; fontSize -= 2) {
        context.font = `bold ${fontSize}px "Noto Sans JP"`;
        const lines = wrapText(context, title, maxWidth, lang);
        if (lines.length <= 3) return { fontSize, lines };
    }

    context.font = `bold ${minimumFontSize}px "Noto Sans JP"`;
    const lines = wrapText(context, title, maxWidth, lang);
    if (lines.length > 3) {
        const visibleLines = lines.slice(0, 3);
        let lastLine = visibleLines[2];
        while (lastLine && context.measureText(`${lastLine}…`).width > maxWidth) {
            lastLine = lastLine.slice(0, -1).trimEnd();
        }
        visibleLines[2] = `${lastLine}…`;
        return { fontSize: minimumFontSize, lines: visibleLines };
    }

    return { fontSize: minimumFontSize, lines };
}

/**
 * Generate a page-specific OGP image in public/ogp/generated and return its
 * public path. The operation is synchronous because Next.js metadata can also
 * be declared synchronously (for example, the not-found page).
 */
export function createOGP(title: string, pagePath: string, lang: OGPLanguage) {
    const normalizedTitle = resolvePageTitle(title, pagePath, lang);
    const fileName = fileNameFor(pagePath, lang);
    const outputPath = path.join(outputDirectory, fileName);
    const canvas = createCanvas(OGPwidth, OGPheight);
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = fs.readFileSync(path.join(publicDirectory, "images/OMU_photo.png"));
    drawCoverImage(context, background);

    const shade = context.createLinearGradient(0, 0, OGPwidth, 0);
    shade.addColorStop(0, "rgba(5, 22, 42, 0.98)");
    shade.addColorStop(0.68, "rgba(5, 22, 42, 0.90)");
    shade.addColorStop(1, "rgba(5, 22, 42, 0.48)");
    context.fillStyle = shade;
    context.fillRect(0, 0, OGPwidth, OGPheight);

    context.fillStyle = "#38bdf8";
    context.fillRect(84, 82, 92, 8);

    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "rgba(255, 255, 255, 0.84)";
    context.font = 'normal 27px "Noto Sans JP"';
    context.fillText(lang === "ja" ? "大阪公立大学 山本研究室" : "Yamamoto Group · Osaka Metropolitan University", 84, 112);

    const { fontSize, lines } = titleLayout(context, normalizedTitle, lang);
    const lineHeight = Math.round(fontSize * 1.35);
    const titleHeight = lines.length * lineHeight;
    const titleTop = Math.max(206, 332 - titleHeight / 2);
    context.fillStyle = "#ffffff";
    context.font = `bold ${fontSize}px "Noto Sans JP"`;
    lines.forEach((line, index) => context.fillText(line, 84, titleTop + index * lineHeight));

    context.fillStyle = "rgba(255, 255, 255, 0.66)";
    context.font = 'normal 22px "Noto Sans JP"';
    context.fillText(
        lang === "ja" ? "非平衡量子多体物性理論研究室" : "Nonequilibrium Quantum Many-Body Physics",
        84,
        548,
    );

    fs.mkdirSync(outputDirectory, { recursive: true });
    fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));

    return `/ogp/generated/${fileName}`;
}
