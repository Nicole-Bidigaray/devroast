import "server-only";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";

import { createTRPCContextCached } from "@/trpc/init";
import { makeQueryClient } from "@/trpc/query-client";
import { appRouter } from "@/trpc/routers/_app";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContextCached,
  queryClient: getQueryClient,
  router: appRouter,
});

export const caller = appRouter.createCaller(createTRPCContextCached);

export function HydrateClient({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HydrationBoundary state={dehydrate(getQueryClient())}>
      {children}
    </HydrationBoundary>
  );
}
