import type { BundledLanguage } from "shiki";

import { CodeBlock } from "@/components/ui/code-block";

type LeaderboardEntryCardProps = {
  code: string;
  language: BundledLanguage;
  rank: number;
  score: string;
};

export async function LeaderboardEntryCard({
  code,
  language,
  rank,
  score,
}: LeaderboardEntryCardProps) {
  const lineCount = Math.max(1, code.split(/\r\n|\r|\n/).length);

  return (
    <article className="w-full border border-border-primary">
      <header className="flex h-12 items-center justify-between border-b border-border-primary px-5">
        <div className="flex items-center gap-5">
          <span className="font-mono text-xs text-accent-amber">{rank}</span>
          <span className="font-mono text-xs font-bold text-accent-red">
            {score}
          </span>
        </div>

        <div className="font-mono text-xs text-text-tertiary">
          {language} {lineCount} lines
        </div>
      </header>

      <div className="min-h-30 w-full bg-bg-input px-5 py-3">
        <CodeBlock
          className="max-w-none border-0 bg-transparent"
          code={code}
          language={language}
        />
      </div>
    </article>
  );
}
