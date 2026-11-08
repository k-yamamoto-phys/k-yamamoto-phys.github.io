import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile, cp } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { prepareMarkdownImages } from './prepare-markdown-images.mjs';
import { optimizeExportImages } from './optimize-export-images.mjs';
const sharp = createRequire(path.join(process.cwd(), 'package.json'))('sharp');

test('元PNGを保ったまま可逆WebPを生成し、出力最適化で再圧縮しない', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'markdown-webp-test-'));
    try {
        const pub = path.join(root, 'public');
        await mkdir(path.join(pub, 'images'), { recursive: true });
        const original = path.join(pub, 'images/diagram.png');
        const input = await sharp({create:{width:320,height:240,channels:4,background:{r:80,g:150,b:200,alpha:0.4}}}).png({compressionLevel:0}).toBuffer();
        await writeFile(original, input);
        assert.equal(await prepareMarkdownImages(pub), 1);
        const variant = path.join(pub, '_optimized/images/diagram.png.webp');
        const before = await readFile(variant);
        assert.ok(before.length < input.length);
        assert.ok((await sharp(before).ensureAlpha().raw().toBuffer()).equals(await sharp(input).ensureAlpha().raw().toBuffer()), "PNG と WebP の画素が一致する");
        const out = path.join(root, 'out');
        await cp(pub, out, { recursive: true });
        await optimizeExportImages(out);
        assert.ok((await readFile(path.join(out, '_optimized/images/diagram.png.webp'))).equals(before));
        assert.ok((await readFile(original)).equals(input));
    } finally {
        await rm(root, {recursive:true, force:true});
    }
});
