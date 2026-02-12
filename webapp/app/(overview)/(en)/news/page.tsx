import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link"
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';
import { MetadataGenerator } from "@/app/lib/metadata";
import React from "react";
import Acctivity from "@/app/ui/server/acctivity";

export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`news`, `recent activities and updates for Dr. Kazuki Yamamoto`);
}

export default async function Page() {
    return (
        <div className="m-2 p-2 prose">
            <h1>Recent Activities</h1>
            <Acctivity lang="en" />
            <Link href="/en" className="btn btn-primary  text-white"><FaHome />Back to Home</Link>
        </div>
    );
}
