import type { Metadata } from "next";
import { MetadataGenerator } from "@/app/lib/metadata";
import md_content from "@/group/members_other_en.md";
import { convertMarkdownToHtml } from "@/app/lib/markdown";
import { siteMetadata } from "@/group/_metadata";
import { withBasePath } from "@/app/lib/site-paths";
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
    type: "leader" | "member" | "alumni" | "colabrator";
    photo: string | null;
    message: {
        ja: string;
        en: string;
    }
}



export default async function Page() {
    const htmlContent = await convertMarkdownToHtml(md_content as string);
    const member_data = members as memberEntry[];
    const internalMembers = member_data.filter((member) => member.type !== "colabrator");
    const collaborators = member_data.filter((member) => member.type === "colabrator");

    return (
        <>
            <div className="m-2 p-2 prose">
                <h1>Members</h1>
                <div className="md:w-1/2 w-full mx-auto">
                    <img src={withBasePath(siteMetadata.all_member_img)} alt="Group Members" className="w-full object-contain" />
                </div>
            </div>
            <h2 className="ml-4 text-2xl font-bold">Group Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
                {
                    internalMembers.map((member, index) => (
                        <MemberCard key={index} member={member} lang="en" />
                    ))
                }
            </div>
            {collaborators.length > 0 && (
                <>
                    <h2 className="ml-4 text-2xl font-bold">Collaborators (Research Assistant)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
                        {
                            collaborators.map((member, index) => (
                                <MemberCard key={index} member={member} lang="en" />
                            ))
                        }
                    </div>
                </>
            )}

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
            <div className="card-body flex flex-row items-start gap-4 md:flex-col">
                {member.photo && (
                    <div className="flex shrink-0 flex-col">
                        <div className="avatar">
                            <div className="w-24 aspect-square rounded-xl">
                                <img src={withBasePath(member.photo)} alt={member.name[lang]} className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </div>
                )}
                <div className="min-w-0 flex-1">
                    <h2 className="card-title text-lg">{member.name[lang]}</h2>
                    <p>{member.position[lang]}</p>
                    {message && (
                        <div className="member-message min-w-0 break-words text-sm" dangerouslySetInnerHTML={{ __html: message }}></div>
                    )}
                </div>
            </div>
        </div>
    )
}
