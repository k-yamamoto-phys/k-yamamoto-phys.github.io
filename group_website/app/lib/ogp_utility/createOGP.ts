// const { createCanvas, loadImage, registerFont } = require("canvas");
// const fs = require("fs").promises;
// import path from "path";
// const folder_path = path.join(process.cwd(), "app/lib/ogp_utility/")
// const notoSansJP_bold_path = path.join(folder_path, "NotoSansJP-Bold.ttf");
// registerFont(notoSansJP_bold_path, { family: "NotoSansJP", weight: "bold" });
// const notoSansJP_regular_path = path.join(folder_path, "NotoSansJP-Regular.ttf");
// registerFont(notoSansJP_regular_path, { family: "NotoSansJP", weight: "regular" });

// const magazine_bg_path = path.join(folder_path, "./magazine_background.png");;
// const keyword_bg_path = path.join(folder_path, "./keyword_background.png");

// export const OGPwidth = 1200;
// export const OGPheight = 630;

// export const magazineOGPCreater = async (vol: number, year: number) => {
//     const canvas = createCanvas(OGPwidth, OGPheight);
//     const ctx = canvas.getContext("2d");
//     const baseImage = await loadImage(magazine_bg_path);
//     ctx.drawImage(baseImage, 0, 0, OGPwidth, OGPheight);

//     ctx.fillStyle = "white";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";

//     ctx.font = "bold 75px NotoSansJP";
//     ctx.fillText(`vol. ${vol}`, OGPwidth / 2, OGPheight / 2 - 45);
//     ctx.font = "regular 34px NotoSansJP";
//     ctx.fillText(`${year}年発行`, OGPwidth / 2, OGPheight / 2 + 25);

//     const buffer = canvas.toBuffer("image/png");
//     const result_path_base = `ogp/magazine_${vol}.png`;
//     await fs.writeFile(path.join(process.cwd(),"public", result_path_base), buffer);
//     return path.join(process.env.PUBLIC_URL as string, result_path_base);
// }
// export const keywordOGPCreater = async (keyword: string) => {
//     const canvas = createCanvas(OGPwidth, OGPheight);
//     const ctx = canvas.getContext("2d");
//     const baseImage = await loadImage(keyword_bg_path);
//     ctx.drawImage(baseImage, 0, 0, OGPwidth, OGPheight);

//     ctx.fillStyle = "white";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";

//     if (keyword.length > 4) {
//         ctx.font = "bold 41.5px NotoSansJP";
//         ctx.fillText(`${keyword}`, OGPwidth / 2, OGPheight / 2 + 0);
//     } else {
//         ctx.font = "bold 80px NotoSansJP";
//         ctx.fillText(`${keyword}`, OGPwidth / 2, OGPheight / 2 + 14);
//     }
//     const buffer = canvas.toBuffer("image/png");
//     const result_path_base = `ogp/keyword_${keyword}.png`;
//     await fs.writeFile(path.join(process.cwd(), "public", result_path_base), buffer);
//     return path.join(process.env.PUBLIC_URL as string, result_path_base);
// }
