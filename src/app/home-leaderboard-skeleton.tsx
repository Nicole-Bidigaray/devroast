export function HomeLeaderboardSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <article
            className="overflow-hidden border border-border-primary"
            key={`home-leaderboard-skeleton-${index + 1}`}
          >
            <div className="flex h-11 items-center justify-between border-b border-border-primary px-4">
              <div className="flex items-center gap-4">
                <div className="h-3 w-8 animate-pulse bg-bg-surface" />
                <div className="h-3 w-10 animate-pulse bg-bg-surface" />
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-16 animate-pulse bg-bg-surface" />
                <div className="h-3 w-14 animate-pulse bg-bg-surface" />
              </div>
            </div>

            <div className="space-y-3 p-4">
              <div className="h-3 w-full animate-pulse bg-bg-surface" />
              <div className="h-3 w-full animate-pulse bg-bg-surface" />
              <div className="h-3 w-5/6 animate-pulse bg-bg-surface" />
              <div className="h-3 w-2/3 animate-pulse bg-bg-surface" />
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center px-4 py-2">
        <div className="h-3 w-52 animate-pulse bg-bg-surface" />
      </div>
    </>
  );
}
