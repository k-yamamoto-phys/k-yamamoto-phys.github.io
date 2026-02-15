import type { ResolvingMetadata, Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import md_content from "@/group/members_other_en.md";
import { convertMarkdownToHtml } from "@/app/lib/markdown";
import { Hero } from "@/app/ui/client/crousel";
import { siteMetadata } from "@/group/_metadata";
import members from "@/group/members.yml";

export async function generateMetadata(): Promise<Metadata> {
    return MetadataGenerator(`members `, `the lists of members in Yamamoto's group`, '/members', "en");
}

export type memberEntry = {
    name: {
        ja: string;
        en: string;
    }
    position: {
        ja: string;
        en: string;
    }
    photo: string;
    message: {
        ja: string;
        en: string;
    }
}



export default async function Page() {
    const htmlContent = await convertMarkdownToHtml(md_content as string);
    const member_data = members as memberEntry[];

    return (
        <>
            <div className="m-2 p-2 prose">
                <h1>Members</h1>
                <div className="md:w-1/2 w-full mx-auto">
                    <img src={siteMetadata.all_member_img} alt="Group Members" className="w-full object-contain" />
                </div>
            </div>
            <h2 className="ml-4 text-2xl font-bold">Introduction of Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
                {
                    member_data.map((member, index) => (
                        <MemberCard key={index} member={member} lang="en" />
                    ))
                }
            </div>

            <div className="m-2 p-2 prose">
                <div dangerouslySetInnerHTML={{ __html: htmlContent || "" }} />
            </div>
        </>
    );
}

const MemberCard = async ({ member, lang }: { member: memberEntry, lang: "ja" | "en" }) => {
    const message = await convertMarkdownToHtml(member.message[lang] || "");
    return (
        <div className="card bg-base-100 card-md shadow-sm border border-gray-400">
            <div className="card-body flex-row">
                <div className="flex flex-col justify-center">
                    <div className="avatar">
                        <div className="w-24 rounded-xl">
                            <img src={member.photo} alt={member.name[lang]} />
                        </div>
                    </div>
                </div>
                <div className="ml-6 w-full min-w-0">
                    <h2 className="card-title">{member.name[lang]}</h2>
                    <p>{member.position[lang]}</p>
                    <div className="min-w-0 break-all" dangerouslySetInnerHTML={{ __html: message || "" }}></div>
                </div>
            </div>
        </div>
    )
}