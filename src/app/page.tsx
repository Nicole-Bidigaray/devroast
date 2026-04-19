import Link from "next/link";
import { Suspense } from "react";

import { HomeLeaderboard } from "@/app/home-leaderboard";
import { HomeLeaderboardSkeleton } from "@/app/home-leaderboard-skeleton";
import { HomePageClient } from "@/components/home/home-page-client";
import { buttonVariants } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.roast.getStats.queryOptions());

  return (
    <HydrateClient>
      <HomePageClient
        leaderboardSection={
          <section className="mt-8 flex w-full max-w-5xl flex-col gap-6">
            <div className="flex items-center justify-between">
              <SectionTitle>shame_leaderboard</SectionTitle>

              <Link
                className={buttonVariants({ variant: "link" })}
                href="/leaderboard"
              >
                $ view_all {">>"}
              </Link>
            </div>

            <p className="font-sans text-[13px] text-text-tertiary">
              {"// the worst code on the internet, ranked by shame"}
            </p>

            <Suspense fallback={<HomeLeaderboardSkeleton />}>
              <HomeLeaderboard />
            </Suspense>
          </section>
        }
      />
    </HydrateClient>
  );
}
