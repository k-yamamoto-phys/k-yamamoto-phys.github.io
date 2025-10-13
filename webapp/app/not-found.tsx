import type { Metadata,  } from "next";
import { MetadataGenerator } from "./lib/metadata";

export const metadata: Metadata = MetadataGenerator("ページが見つかりません（404）", "お探しのページが見つかりませんでした。URLが間違っている可能性があります。");
export default function Page() {
    return (
            <div className="m-2 p-2" >
                <h1 className="text-2xl mt-5 mb-2 font-bold">ページが見つかりませんでした。(404 Page was not found)</h1>
            </div>
    );
}