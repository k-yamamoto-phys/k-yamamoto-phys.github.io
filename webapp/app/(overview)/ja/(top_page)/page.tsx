import type { ResolvingMetadata, Metadata } from "next";
import Link from "next/link"
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';
import { MetadataGenerator } from "@/app/lib/metadata";

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {   
    return MetadataGenerator(`top page`, `top page`); 
}

export default async function Page() {
    return (
        <div className="m-2 p-2">
            top page
        </div>
    );
}