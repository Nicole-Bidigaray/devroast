import type { Metadata } from "next";

import { LeaderboardEntryCard } from "@/components/leaderboard/leaderboard-entry-card";

type LeaderboardEntry = {
  codeLines: Array<{
    content: string;
    tone?: "default" | "comment";
  }>;
  language: string;
  lineCount: number;
  rank: number;
  score: string;
};

const leaderboardEntries: LeaderboardEntry[] = [
  {
    rank: 1,
    score: "1.2",
    language: "javascript",
    lineCount: 3,
    codeLines: [
      { content: 'eval(prompt("enter code"))' },
      { content: "document.write(response)" },
      { content: "// trust the user lol", tone: "comment" },
    ],
  },
  {
    rank: 2,
    score: "1.8",
    language: "typescript",
    lineCount: 3,
    codeLines: [
      { content: "if (x == true) { return true; }" },
      { content: "else if (x == false) { return false; }" },
      { content: "else { return !false; }" },
    ],
  },
  {
    rank: 3,
    score: "2.1",
    language: "sql",
    lineCount: 2,
    codeLines: [
      { content: "SELECT * FROM users WHERE 1=1" },
      { content: "-- TODO: add authentication", tone: "comment" },
    ],
  },
  {
    rank: 4,
    score: "2.3",
    language: "java",
    lineCount: 3,
    codeLines: [
      { content: "catch (e) {" },
      { content: "  // ignore" },
      { content: "}" },
    ],
  },
  {
    rank: 5,
    score: "2.5",
    language: "javascript",
    lineCount: 3,
    codeLines: [
      { content: "const sleep = (ms) =>" },
      { content: "  new Date(Date.now() + ms);" },
      { content: "while(Date.now() < end) {}" },
    ],
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
            codeLines={entry.codeLines}
            key={`leaderboard-entry-${entry.rank}`}
            language={entry.language}
            lineCount={entry.lineCount}
            rank={entry.rank}
            score={entry.score}
          />
        ))}
      </section>
    </main>
  );
}
