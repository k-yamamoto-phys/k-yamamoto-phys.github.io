import dayjs from "dayjs";

type DatedActivity = {
    date: string | Date | (string | Date)[];
};

// 期間のある活動は、表示・年別分類と同じく開始日を基準にする。
export function sortActivities<T extends DatedActivity>(activities: readonly T[], limit?: number): T[] {
    return [...activities]
        .sort((a, b) => {
            const dateA = Array.isArray(a.date) ? a.date[0] : a.date;
            const dateB = Array.isArray(b.date) ? b.date[0] : b.date;
            return dayjs(dateB).valueOf() - dayjs(dateA).valueOf();
        })
        .slice(0, limit);
}
