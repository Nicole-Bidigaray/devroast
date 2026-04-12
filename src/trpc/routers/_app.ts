import { createTRPCRouter } from "@/trpc/init";

import { roastRouter } from "./metrics";

export const appRouter = createTRPCRouter({
  roast: roastRouter,
});

export type AppRouter = typeof appRouter;
