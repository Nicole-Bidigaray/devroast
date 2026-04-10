export function Navbar() {
  return (
    <header className="flex h-14 w-full items-center border-b border-border-primary bg-bg-page px-6">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xl font-bold text-accent-green">
          &gt;
        </span>
        <span className="font-mono text-lg font-medium text-text-primary">
          devroast
        </span>
      </div>

      <span className="flex-1" />

      <span className="font-mono text-[13px] text-text-secondary">
        leaderboard
      </span>
    </header>
  );
}
