import { existsSync } from "node:fs";
import path from "node:path";

/** ローカル画像の生成済みWebPがある場合だけ、表示先を差し替える。 */
export function markdownImagePath(src: string, publicRoot = path.join(process.cwd(), "public")): string {
    if (!src.startsWith("/") || src.startsWith("//")) return src;
    const split = src.search(/[?#]/);
    const pathname = split < 0 ? src : src.slice(0, split);
    const suffix = split < 0 ? "" : src.slice(split);
    if (!/\.(png|jpe?g)$/i.test(pathname)) return src;
    let decoded: string;
    try { decoded = decodeURIComponent(pathname); } catch { return src; }
    const root = path.resolve(publicRoot);
    const original = path.resolve(root, `.${decoded}`);
    const optimizedRoot = path.join(root, "_optimized");
    const optimized = path.resolve(optimizedRoot, `.${decoded}.webp`);
    if (!original.startsWith(`${root}${path.sep}`) || !optimized.startsWith(`${optimizedRoot}${path.sep}`)) return src;
    return existsSync(original) && existsSync(optimized) ? `/_optimized${pathname}.webp${suffix}` : src;
}
