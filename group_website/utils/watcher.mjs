// next.jsが監視してくれない、マークダウンの更新を検知して開発サーバーひ通知するスクリプト
// ./.reloaderの更新日時を更新することで、next.jsに変更を検知させる
import fs from 'fs'; 
import path from 'path';

const WATCH_DIR = path.join(process.cwd(), "../", "site_data", "group", "markdown_pages");
const RELOADER = path.join(process.cwd(), "utils", ".reloader");

let timer;
fs.watch(WATCH_DIR, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.md')) {

        clearTimeout(timer);
        timer = setTimeout(() => {;
            console.log(`Markdown file changed: ${filename} (${eventType})`);
            const now = new Date();
            fs.utimesSync(RELOADER, now, now);
        }, 100);
    }

});
