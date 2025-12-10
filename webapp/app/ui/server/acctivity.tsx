import { convertMarkdownToHtml } from "@/app/lib/markdown"
import activity_data from "@/app/site_data/activity.yml"
import dayjs from "dayjs";
export type activityEntry = {
    date: Date[] | Date; // 単一の日付の場合は文字列、複数の日付の場合は文字列の配列
    label: "award" | "publication" | "seminar" | "invited seminar" | "talk" | "invited talk" | "poster" | "other"     ;
    content: {
        ja?: string;
        en?: string;
    };
}
const BadgeMap = {
    award: "badge-warning",
    publication: "badge-success",
    seminar: "badge-info",
    "invited seminar": "badge-info",
    talk: "badge-accent",
    "invited talk": "badge-accent",
    poster: "badge-natural",
}
export default function Acctivity({lang, limit}: {lang: string, limit?: number}) {
    const activityData = activity_data as activityEntry[];
    return (
        <>
            <ul>
                {
                    activityData.slice(0, limit ?? activityData.length).map((activity, index) => (
                        <li key={index}>
                            <ActivityItem activity={activity} lang={lang} />
                        </li>
                    ))
                }
            </ul>
        </>
    );
}


async function ActivityItem({ activity, lang }: { activity: activityEntry, lang: string }) {
    let dateString: string;
    let budgeObject; 
    if (activity.label !== "other") {
        const badgeType = BadgeMap[activity.label];
        budgeObject = <span className={`badge  badge-soft ${badgeType}`}>{activity.label}</span>
    } else {
        budgeObject = <></>
    }
    const compileString = lang === "ja" ? "YYYY年MM月DD日" : "MMM. DD, YYYY";
    if (Array.isArray(activity.date)) {
        dateString = activity.date.map(date => dayjs(date).format(compileString)).join(" ~ ");
    } else {
        dateString = dayjs(activity.date).format(compileString);
    }
    const markdown_content = lang === "ja" ? activity.content.ja : activity.content.en;
    if (!markdown_content) {
        return <></>;
    }
    const html_content = await convertMarkdownToHtml(markdown_content);
    return (
        <div>
            <strong>{dateString}</strong> {budgeObject}
            <div className="prose" dangerouslySetInnerHTML={{ __html: html_content }} />
        </div>
    );
}