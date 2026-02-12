// ホットリロードを可能にするためにloaderを用いるように変更したため、このファイルは不要に
// import fs from 'fs'; 
// import path from 'path';
// import yaml from 'js-yaml';
// import { convertMarkdownToHtml } from './markdown';

// export function loadYAML(filePath: string): any {
//     try {
//         const fullPath = path.join(process.cwd(), filePath);
//         const fileContents = fs.readFileSync(fullPath, 'utf8');
//         return yaml.load(fileContents);
//     } catch (error) {
//         console.error(`Error loading YAML file at ${filePath}:`, error);
//         return null;
//     }
// }

// export async function loadMarkdown(filePath: string): Promise<string | null> {
//     try {
//         const fullPath = path.join(process.cwd(), filePath);
//         const fileContents = fs.readFileSync(fullPath, 'utf8');
//         return convertMarkdownToHtml(fileContents);
//     } catch (error) {
//         console.error(`Error loading Markdown file at ${filePath}:`, error);
//         return null;
//     }
// }