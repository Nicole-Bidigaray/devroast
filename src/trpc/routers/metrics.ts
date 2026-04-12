import { avg, count } from "drizzle-orm";

import { roasts } from "@/db/schema";

import { baseProcedure, createTRPCRouter } from "../init";

export const roastRouter = createTRPCRouter({
  getStats: baseProcedure.query(async ({ ctx }) => {
    const [stats] = await ctx.db
      .select({
        avgScore: avg(roasts.score),
        totalRoasts: count(),
      })
      .from(roasts);

    return {
      avgScore: stats.avgScore ? Number.parseFloat(stats.avgScore) : 0,
      totalRoasts: stats.totalRoasts,
    };
  }),
});
