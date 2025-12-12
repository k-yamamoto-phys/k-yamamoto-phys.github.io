import { convertMarkdownToHtml } from "@/app/lib/markdown"
import activity_data from "@/app/site_data/activity.yml"
import React from "react";
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
    const activity_by_year = Object.entries(
        activityData.slice(0, limit ?? activityData.length).reduce((acc, activity) => {
            const year = dayjs(Array.isArray(activity.date) ? activity.date[0] : activity.date).year();
            if (!acc[year]) acc[year] = [];
            acc[year].push(activity);
            return acc;
        }, {} as Record<number, activityEntry[]>)
    ).sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, data]) => ({ year, data }));
    console.log(activity_by_year);
    return (
        <>
            {
                activity_by_year.map(({ year, data },index) => (
                    <React.Fragment key={index}>
                        <h3 >{year}</h3>
                        <ul className="list-none pl-0">
                            {
                                data.map((activity, index, array) => (
                                    <li key={index} className="list-none">
                                        <ActivityItem activity={activity} lang={lang} />
                                    </li>
                                ))
                            }
                        </ul>
                    </React.Fragment>))
            }
            {/* <ul className="pl-0">
                {
                    activityData.slice(0, limit ?? activityData.length).map((activity, index) => (
                        <li key={index} className="list-none">
                            <ActivityItem activity={activity} lang={lang} />
                        </li>
                    ))
                }
            </ul> */}
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
    const compileString2 = lang === "ja" ? "MM月DD日" : "MMMM DD";
    if (Array.isArray(activity.date)) {
        dateString = activity.date.map(date => dayjs(date).format(compileString)).join(" ~ ");
    } else {
        dateString = dayjs(activity.date).format(compileString2);
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