import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { optimizeExportImages } from './optimize-export-images.mjs';

const sharp = createRequire(path.join(process.cwd(), 'package.json'))('sharp');

test('出力先の画像だけを最適化し、元画像とPNGの画素を保つ', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'image-export-test-'));
    try {
        const out = path.join(root, 'out');
        await mkdir(path.join(out, 'nested'), { recursive: true });
        const raw = Buffer.alloc(320 * 240 * 3);
        for (let i = 0; i < raw.length; i++) raw[i] = Math.floor(i / 960) % 256;
        const image = sharp(raw, { raw: { width: 320, height: 240, channels: 3 } });
        const source = path.join(root, 'original.jpg');
        await writeFile(source, await image.clone().jpeg({ quality: 100 }).toBuffer());
        await copyFile(source, path.join(out, 'nested/photo.jpg'));
        const png = path.join(out, 'nested/graphic.png');
        await writeFile(png, await image.clone().png({ compressionLevel: 0 }).toBuffer());
        const pngBefore = await sharp(png).raw().toBuffer();
        const sourceBefore = await readFile(source);
        const sizesBefore = await Promise.all(['photo.jpg', 'graphic.png'].map(async f => (await readFile(path.join(out, 'nested', f))).length));
        const result = await optimizeExportImages(out);
        assert.ok(result.count >= 1);
        assert.deepEqual(await readFile(source), sourceBefore);
        assert.deepEqual(await sharp(png).raw().toBuffer(), pngBefore);
        for (const [i, f] of ['photo.jpg', 'graphic.png'].entries()) {
            assert.ok((await readFile(path.join(out, 'nested', f))).length <= sizesBefore[i]);
        }
    } finally {
        await rm(root, { recursive: true, force: true });
    }
});
