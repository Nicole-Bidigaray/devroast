import { HomePageClient } from "@/components/home/home-page-client";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.roast.getStats.queryOptions());

  return (
    <HydrateClient>
      <HomePageClient />
    </HydrateClient>
  );
}
