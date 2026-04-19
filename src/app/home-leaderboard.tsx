import type { BundledLanguage } from "shiki";

import { CodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";
import { caller } from "@/trpc/server";

import { LeaderboardEntryCode } from "./leaderboard-entry-code";

const bundledLanguages = new Set<BundledLanguage>([
  "javascript",
  "typescript",
  "sql",
  "java",
]);

function getPreviewCode(code: string) {
  return code
    .split(/\r\n|\r|\n/)
    .slice(0, 5)
    .join("\n");
}

function resolveCodeLanguage(language: string): BundledLanguage {
  if (bundledLanguages.has(language as BundledLanguage)) {
    return language as BundledLanguage;
  }

  return "typescript";
}

function scoreColor(score: number) {
  if (score <= 2.5) {
    return "text-accent-red";
  }

  if (score <= 5) {
    return "text-accent-amber";
  }

  return "text-accent-green";
}

export async function HomeLeaderboard() {
  const { entries, totalCount } = await caller.roast.getLeaderboard();

  return (
    <>
      {entries.length === 0 ? (
        <div className="border border-border-primary px-5 py-4 font-mono text-xs text-text-tertiary">
          no roasts yet.
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        {entries.map((entry) => (
          <article
            className="overflow-hidden border border-border-primary"
            key={entry.id}
          >
            <header className="flex h-11 items-center justify-between border-b border-border-primary px-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-accent-amber">
                  #{entry.rank}
                </span>

                <span
                  className={cn(
                    "font-mono text-xs font-bold",
                    scoreColor(entry.score),
                  )}
                >
                  {entry.score.toFixed(1)}
                </span>
              </div>

              <div className="font-mono text-xs text-text-tertiary">
                {entry.language} - {entry.lineCount} lines
              </div>
            </header>

            <LeaderboardEntryCode
              lineCount={entry.lineCount}
              previewSlot={
                <CodeBlock
                  className="max-w-none border-0"
                  code={getPreviewCode(entry.code)}
                  language={resolveCodeLanguage(entry.language)}
                />
              }
            >
              <CodeBlock
                className="max-w-none border-0"
                code={entry.code}
                language={resolveCodeLanguage(entry.language)}
              />
            </LeaderboardEntryCode>
          </article>
        ))}
      </div>

      <div className="flex justify-center px-4 py-2">
        <p className="font-sans text-xs text-text-tertiary">
          showing top 3 of {totalCount.toLocaleString("en-US")}
        </p>
      </div>
    </>
  );
}
