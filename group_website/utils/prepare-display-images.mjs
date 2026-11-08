// 表示用画像は元画像から自動生成する。元画像はそのまま保存する。
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

async function createDisplayImage(source, destination, width) {
    await mkdir(path.dirname(destination), { recursive: true });
    await sharp(source).rotate().resize({ width, withoutEnlargement: true })
        .webp({ quality: 95, effort: 6 }).toFile(destination);
}

await createDisplayImage('public/images/OMU_photo.png', 'public/images/OMU_photo-display.webp', 2560);
const memberDir = 'public/images/members/all';
for (const item of await readdir(memberDir, { withFileTypes: true })) {
    if (!item.isFile() || !/\.(jpe?g|png|webp)$/i.test(item.name) || item.name.endsWith('-display.webp')) continue;
    const output = `${item.name}-display.webp`;
    await createDisplayImage(path.join(memberDir, item.name), path.join(memberDir, output), 1600);
}
console.log('トップと集合写真の表示用画像を元画像から生成しました。');
