import React from "react";
import {
    SiLeetcode,
    SiCodeforces,
    SiCodechef,
    SiGeeksforgeeks,
} from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { TbWorldCode } from "react-icons/tb";

const SheetsList = () => {
    const sheets = [
        {
            name: "Striver's A2Z Sheet",
            platform: "other",
            level: "Beginner → Advanced",
            link: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2",
            humour: "Recommended dosage: 2 problems daily.",
            action: "Start Grinding",
            color: "from-emerald-100 to-green-50",
        },
        {
            name: "Love Babbar Sheet",
            platform: "gfg",
            level: "Interview Prep",
            link: "https://www.geeksforgeeks.org/explore?page=1&sprint=94ade6723438d94ecf0c00c3937dad55&sortBy=submissions&sprint_name=Love%20Babbar%20Sheet",
            humour: "Side effects include debugging nightmares.",
            action: "Challenge Accepted",
            color: "from-orange-100 to-amber-50",
        },
        {
            name: "CSES Problem Set",
            platform: "other",
            level: "CP + DSA",
            link: "https://cses.fi/problemset/",
            humour: "Sleep is optional here.",
            action: "No Sleep Mode",
            color: "from-sky-100 to-cyan-50",
        },
        {
            name: "GFG 160",
            platform: "gfg",
            level: "Placement Prep",
            link: "https://www.geeksforgeeks.org/courses/gfg-160-series",
            humour: "Return to Stack Overflow if lost.",
            action: "Conquer Now",
            color: "from-lime-100 to-green-50",
        },
        {
            name: "LeetCode Top 150",
            platform: "leetcode",
            level: "Interview Ready",
            link: "https://leetcode.com/studyplan/top-interview-150/",
            humour: "Perfect way to spend your evenings.",
            action: "Solve Now",
            color: "from-yellow-100 to-orange-50",
        },
        {
            name: "LeetCode Top 100 Liked",
            platform: "leetcode",
            level: "Must Do",
            link: "https://leetcode.com/studyplan/top-100-liked/",
            humour: "Turning coffee into accepted submissions.",
            action: "Code Hard",
            color: "from-pink-100 to-rose-50",
        },
        {
            name: "Blind 75",
            platform: "leetcode",
            level: "FAANG Prep",
            link: "https://leetcode.com/problem-list/oizxjoit/",
            humour: "Panic-solving at 2AM starts here.",
            action: "Panic Mode",
            color: "from-violet-100 to-purple-50",
        },
        {
            name: "CP-31 Sheet",
            platform: "codeforces",
            level: "Competitive Programming",
            link: "https://www.tle-eliminators.com/cp-sheet",
            humour: "Coffee + bugs + ratings.",
            action: "Brain Burn",
            color: "from-blue-100 to-indigo-50",
        },
        {
            name: "NeetCode 150",
            platform: "leetcode",
            level: "Interview Prep",
            link: "https://neetcode.io/practice",
            humour: "Cleaner roadmap, same pain.",
            action: "Get Hired",
            color: "from-teal-100 to-cyan-50",
        },
        {
            name: "USACO Guide",
            platform: "other",
            level: "CP Learning",
            link: "https://usaco.guide/",
            humour: "Where legends are manufactured.",
            action: "Train Hard",
            color: "from-fuchsia-100 to-pink-50",
        },
        {
            name: "AtCoder DP Contest",
            platform: "other",
            level: "Dynamic Programming",
            link: "https://atcoder.jp/contests/dp/tasks",
            humour: "DP trauma begins now.",
            action: "DP Madness",
            color: "from-red-100 to-rose-50",
        },
        {
            name: "Striver SDE Sheet",
            platform: "other",
            level: "SDE Interview Prep",
            link: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
            humour: "One sheet to rule all interview stress.",
            action: "Ace Interviews",
            color: "from-indigo-100 to-blue-50",
        },
    ];

    const getIcon = (platform) => {
        switch (platform) {
            case "leetcode":
                return <SiLeetcode className="text-orange-500 text-3xl" />;
            case "codeforces":
                return <SiCodeforces className="text-blue-600 text-3xl" />;
            case "codechef":
                return <SiCodechef className="text-amber-700 text-3xl" />;
            case "gfg":
                return <SiGeeksforgeeks className="text-green-600 text-3xl" />;
            default:
                return <TbWorldCode className="text-slate-600 text-3xl" />;
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 p-6">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10">
                <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl shadow-sm p-8 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-800 mb-3">
                        Coding Sheets Collection
                    </h1>

                    <p className="text-slate-500 text-lg italic">
                        "Because scrolling reels won't get you a job."
                    </p>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 max-w-6xl mx-auto">
                {sheets.map((sheet, index) => (
                    <div
                        key={index}
                        className={`bg-linear-to-br ${sheet.color}
                        border border-white/50
                        rounded-3xl
                        shadow-md
                        hover:shadow-2xl
                        hover:-translate-y-1
                        transition-all duration-300
                        p-6 flex flex-col justify-between`}
                    >
                        {/* Top */}
                        <div>
                            <div className="flex items-center justify-between mb-5">
                                {getIcon(sheet.platform)}

                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/70 text-slate-700">
                                    {sheet.level}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-3">
                                {sheet.name}
                            </h2>

                            <p className="text-sm text-slate-600 italic leading-relaxed">
                                {sheet.humour}
                            </p>
                        </div>

                        {/* Bottom */}
                        <a
                            href={sheet.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center justify-center gap-2
                            bg-white text-slate-700 font-semibold
                            px-5 py-3 rounded-2xl
                            hover:bg-slate-900 hover:text-white
                            transition-all duration-300"
                        >
                            {sheet.action}
                            <FiExternalLink />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SheetsList;