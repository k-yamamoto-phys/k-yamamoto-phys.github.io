import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link"
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';
import { MetadataGenerator } from "@/app/lib/metadata";
import React from "react";
import Activity from "@/app/ui/server/activity";

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
    return MetadataGenerator(`最近の活動`, `山本和樹の最近の活動と更新情報`);
}

export default async function Page() {
    return (
        <div className="m-2 p-2 prose">
            <h1>最近の活動</h1>
            <Activity lang="ja" />
            <Link href="/ja" className="btn btn-primary  text-white"><FaHome />ホームへ戻る</Link>
        </div>
    );
}
