// public内の元画像からMarkdown用WebPを用意する。元画像は変更しない。
import { readdir, mkdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire(path.join(process.cwd(), 'package.json'));
const sharp = require('sharp');

export async function prepareMarkdownImages(publicRoot) {
    const root = path.resolve(publicRoot);
    const outputRoot = path.join(root, '_optimized');
    let count = 0;
    async function visit(dir) {
        for (const entry of await readdir(dir, { withFileTypes: true })) {
            const src = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                if (src !== outputRoot && !(dir === path.join(root, 'ogp') && entry.name === 'generated')) await visit(src);
                continue;
            }
            if (!entry.isFile() || !/\.(png|jpe?g)$/i.test(entry.name)) continue;
            const dest = path.join(outputRoot, `${path.relative(root, src)}.webp`);
            try {
                const input = await readFile(src);
                const image = sharp(input, { animated: true });
                const meta = await image.metadata();
                if ((meta.pages ?? 1) > 1 || meta.depth !== 'uchar') {
                    await unlink(dest).catch(error => { if (error.code !== 'ENOENT') throw error; });
                    continue;
                }
                const webp = meta.format === 'png'
                    ? await image.rotate().webp({ lossless: true, effort: 3 }).toBuffer()
                    : await image.rotate().webp({ quality: 95, effort: 4 }).toBuffer();
                if (webp.length < input.length) {
                    await mkdir(path.dirname(dest), { recursive: true });
                    await writeFile(dest, webp);
                    count++;
                } else {
                    await unlink(dest).catch(error => { if (error.code !== 'ENOENT') throw error; });
                }
            } catch (error) {
                // 古い変換結果を使わず元画像に戻す。
                await unlink(dest).catch(unlinkError => { if (unlinkError.code !== 'ENOENT') throw unlinkError; });
                console.warn(`元画像を使用します: ${src}: ${error.message}`);
            }
        }
    }
    await visit(root);
    return count;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    const root = path.resolve(process.cwd(), 'public');
    await stat(root);
    const count = await prepareMarkdownImages(root);
    console.log(`Markdown用のWebPを ${count} 件生成しました。`);
}
