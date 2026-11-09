import { describe, expect, it } from "vitest";
import { sortActivities } from "./sort-activities";

describe("活動の日付順", () => {
    it("記載順によらず日付の新しい順に並べる", () => {
        const activities = [
            { date: "2026-11-23" },
            { date: "2026-11-09" },
            { date: "2026-11-16" },
            { date: "2026-11-04" },
        ];

        expect(sortActivities(activities).map(activity => activity.date)).toEqual([
            "2026-11-23", "2026-11-16", "2026-11-09", "2026-11-04",
        ]);
        expect(activities[1].date).toBe("2026-11-09");
    });

    it("全件を日付順にしてから最新の指定件数を選ぶ", () => {
        const activities = [
            { date: "2026-10-01" },
            { date: "2026-11-09" },
            { date: "2026-11-23" },
        ];

        expect(sortActivities(activities, 2).map(activity => activity.date)).toEqual([
            "2026-11-23", "2026-11-09",
        ]);
    });

    it("期間は開始日で並べ、年をまたぐ日付とDate型にも対応する", () => {
        const range = { date: ["2025-12-28", "2026-01-05"] };
        const older = { date: new Date("2025-12-27T00:00:00Z") };
        const newer = { date: "2026-01-01" };

        expect(sortActivities([range, older, newer])).toEqual([newer, range, older]);
    });

    it("同じ日付は記載順を保ち、空の一覧も扱える", () => {
        const first = { date: "2026-11-09", label: "event" };
        const second = { date: "2026-11-09", label: "award" };

        expect(sortActivities([first, second])).toEqual([first, second]);
        expect(sortActivities([])).toEqual([]);
        expect(sortActivities([first], 0)).toEqual([]);
    });
});
