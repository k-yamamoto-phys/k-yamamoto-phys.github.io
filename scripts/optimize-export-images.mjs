// 公開用ディレクトリ内の画像だけを最適化する。元画像は変更しない。
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire(path.join(process.cwd(), 'package.json'));
const sharp = require('sharp');

export async function optimizeExportImages(root) {
    let saved = 0;
    let count = 0;
    async function visit(dir) {
        for (const entry of await readdir(dir, { withFileTypes: true })) {
            const file = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                await visit(file);
                continue;
            }
            if (!entry.isFile() || !/\.(jpe?g|png|webp|gif|avif)$/i.test(entry.name)) continue;
            // 生成済みの高画質WebPを重ねて非可逆圧縮しない。
            if (entry.name.endsWith('-display.webp')) continue;
            const input = await readFile(file);
            try {
                const image = sharp(input, { animated: true });
                const metadata = await image.metadata();
                // アニメーション・高ビット深度は元の表現を保つ。
                if ((metadata.pages ?? 1) > 1 || metadata.depth !== 'uchar') continue;
                let encoder;
                if (metadata.format === 'jpeg') encoder = image.jpeg({ quality: 95, mozjpeg: true });
                else if (metadata.format === 'png') encoder = image.png({ compressionLevel: 9, effort: 8 });
                else if (metadata.format === 'webp') encoder = image.webp({ quality: 95, effort: 5 });
                else if (metadata.format === 'gif') encoder = image.gif({ reuse: true, effort: 5 });
                else if (metadata.format === 'heif' && metadata.compression === 'av1') encoder = image.avif({ quality: 95, effort: 3 });
                else continue;
                const output = await encoder.keepMetadata().toBuffer();
                // GIFはパレットを再利用し、画素が変わる場合は元のままにする。
                if (metadata.format === 'gif') {
                    const [before, after] = await Promise.all([
                        sharp(input).ensureAlpha().raw().toBuffer(),
                        sharp(output).ensureAlpha().raw().toBuffer(),
                    ]);
                    if (!before.equals(after)) continue;
                }
                if (output.length < input.length) {
                    await writeFile(file, output);
                    saved += input.length - output.length;
                    count++;
                }
            } catch (error) {
                console.warn(`画像を保持しました: ${file}: ${error.message}`);
            }
        }
    }
    await visit(root);
    return { count, saved };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    if (!process.argv[2]) throw new Error('公開用ディレクトリを指定してください');
    const root = path.resolve(process.argv[2]);
    if (!['out', 'pages-artifact'].includes(path.basename(root))) {
        throw new Error('out または pages-artifact ディレクトリのみ処理できます');
    }
    const result = await optimizeExportImages(root);
    console.log(`公開用画像 ${result.count} 件を最適化し、${result.saved} bytes 削減しました。`);
}
