import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const metricsRouter = createTRPCRouter({
  home: baseProcedure.query(() => {
    return {
      avgScore: 4.2,
      totalRoastedCodes: 2847,
    };
  }),
});
