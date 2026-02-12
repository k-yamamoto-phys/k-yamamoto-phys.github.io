import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link"
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';
import { MetadataGenerator } from "@/app/lib/metadata";
import React from "react";
import Acctivity from "@/app/ui/server/acctivity";

export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`最近の活動`, `山本和樹の最近の活動と更新情報`);
}

export default async function Page() {
    return (
        <div className="m-2 p-2 prose">
            <h1>最近の活動</h1>
            <Acctivity lang="ja" />
            <Link href="/ja" className="btn btn-primary  text-white"><FaHome />ホームへ戻る</Link>
        </div>
    );
}
