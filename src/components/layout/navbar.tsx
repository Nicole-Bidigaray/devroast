import Link from "next/link";

export function Navbar() {
  return (
    <header className="flex h-14 w-full items-center border-b border-border-primary bg-bg-page px-6">
      <Link className="flex items-center gap-2" href="/">
        <span className="font-mono text-xl font-bold text-accent-green">
          &gt;
        </span>
        <span className="font-mono text-lg font-medium text-text-primary">
          devroast
        </span>
      </Link>

      <span className="flex-1" />

      <Link
        className="font-mono text-[13px] text-text-secondary transition-colors hover:text-text-primary"
        href="/leaderboard"
      >
        leaderboard
      </Link>
    </header>
  );
}
