import type { Metadata } from "next";
import type { BundledLanguage } from "shiki";

import { LeaderboardEntryCard } from "@/components/leaderboard/leaderboard-entry-card";

type LeaderboardEntry = {
  code: string;
  language: BundledLanguage;
  rank: number;
  score: string;
};

const leaderboardEntries: LeaderboardEntry[] = [
  {
    rank: 1,
    score: "1.2",
    language: "javascript",
    code: [
      'eval(prompt("enter code"))',
      "document.write(response)",
      "// trust the user lol",
    ].join("\n"),
  },
  {
    rank: 2,
    score: "1.8",
    language: "typescript",
    code: [
      "if (x == true) { return true; }",
      "else if (x == false) { return false; }",
      "else { return !false; }",
    ].join("\n"),
  },
  {
    rank: 3,
    score: "2.1",
    language: "sql",
    code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"].join(
      "\n",
    ),
  },
  {
    rank: 4,
    score: "2.3",
    language: "java",
    code: ["catch (e) {", "  // ignore", "}"].join("\n"),
  },
  {
    rank: 5,
    score: "2.5",
    language: "javascript",
    code: [
      "const sleep = (ms) =>",
      "  new Date(Date.now() + ms);",
      "while(Date.now() < end) {}",
    ].join("\n"),
  },
];

export const metadata: Metadata = {
  title: "Shame Leaderboard | Devroast",
  description: "Ranking estatico dos piores trechos de codigo do Devroast.",
};

export const dynamic = "force-dynamic";

export default function LeaderboardPage() {
  return (
    <main className="flex w-full flex-col gap-10 px-4 py-10 md:px-20">
      <section className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-4xl font-bold text-accent-green">
            &gt;
          </span>
          <h1 className="font-mono text-4xl font-bold text-text-primary">
            shame_leaderboard
          </h1>
        </div>

        <p className="font-mono text-sm text-text-secondary">
          {"// the most roasted code on the internet"}
        </p>

        <div className="flex items-center gap-2 font-mono text-xs text-text-tertiary">
          <span>2,847 submissions</span>
          <span>·</span>
          <span>avg score: 4.2/10</span>
        </div>
      </section>

      <section className="flex w-full flex-col gap-5">
        {leaderboardEntries.map((entry) => (
          <LeaderboardEntryCard
            code={entry.code}
            key={`leaderboard-entry-${entry.rank}`}
            language={entry.language}
            rank={entry.rank}
            score={entry.score}
          />
        ))}
      </section>
    </main>
  );
}
