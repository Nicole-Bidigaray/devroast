type LeaderboardCodeLine = {
  content: string;
  tone?: "default" | "comment";
};

type LeaderboardEntryCardProps = {
  codeLines: LeaderboardCodeLine[];
  language: string;
  lineCount: number;
  rank: number;
  score: string;
};

export function LeaderboardEntryCard({
  codeLines,
  language,
  lineCount,
  rank,
  score,
}: LeaderboardEntryCardProps) {
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

      <div className="flex min-h-30 w-full bg-bg-input px-5 py-3">
        <div className="mr-4 flex min-w-4 flex-col gap-1 border-r border-border-primary pr-3 text-right font-mono text-xs text-text-tertiary">
          {codeLines.map((_, index) => (
            <span key={`line-number-${rank}-${index + 1}`}>{index + 1}</span>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {codeLines.map((line, index) => (
            <code
              className={`font-mono text-xs whitespace-pre ${line.tone === "comment" ? "text-text-tertiary" : "text-text-primary"}`}
              key={`line-content-${rank}-${index + 1}`}
            >
              {line.content}
            </code>
          ))}
        </div>
      </div>
    </article>
  );
}
