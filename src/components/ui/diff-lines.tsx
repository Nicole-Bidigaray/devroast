type DiffLinesProps = {
  removed: string;
  added: string;
  context: string;
};

export function DiffLines({ added, context, removed }: DiffLinesProps) {
  return (
    <div className="w-full max-w-140 divide-y divide-border-primary border border-border-primary">
      <div className="flex gap-2 bg-[#1A0A0A] px-4 py-2">
        <span className="font-mono text-[13px] text-accent-red">-</span>
        <span className="font-mono text-[13px] text-text-secondary">
          {removed}
        </span>
      </div>

      <div className="flex gap-2 bg-[#0A1A0F] px-4 py-2">
        <span className="font-mono text-[13px] text-accent-green">+</span>
        <span className="font-mono text-[13px] text-text-primary">{added}</span>
      </div>

      <div className="flex gap-2 px-4 py-2">
        <span className="font-mono text-[13px] text-text-tertiary"> </span>
        <span className="font-mono text-[13px] text-text-secondary">
          {context}
        </span>
      </div>
    </div>
  );
}
