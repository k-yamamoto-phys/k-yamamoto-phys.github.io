import type { Metadata,  } from "next";
import { MetadataGenerator } from "./lib/metadata";

export const metadata: Metadata = MetadataGenerator("ページが見つかりませんでした。(404 Page was not found)", "お探しのページが見つかりませんでした。URLが間違っている可能性があります。", '/not-found', 'ja');
export default function Page() {
    return (
            <div className="m-2 p-2" >
                <h1 className="text-2xl mt-5 mb-2 font-bold">ページが見つかりませんでした。(404 Page was not found)</h1>
            </div>
    );
}