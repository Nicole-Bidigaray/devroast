type ScoreRingProps = {
  score: string;
};

export function ScoreRing({ score }: ScoreRingProps) {
  return (
    <div className="relative size-45 shrink-0">
      <div className="absolute inset-0 rounded-full border-4 border-border-primary" />

      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, #EF4444 0%, #F59E0B 35%, #10B981 35%, #10B981 100%)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <span className="font-mono text-5xl font-bold leading-none text-accent-amber">
          {score}
        </span>
        <span className="font-mono text-base leading-none text-text-tertiary">
          /10
        </span>
      </div>
    </div>
  );
}
