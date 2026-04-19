import { createTRPCRouter } from "@/trpc/init";

import { roastRouter } from "./roast";

export const appRouter = createTRPCRouter({
  roast: roastRouter,
});

export type AppRouter = typeof appRouter;
