import { asc, avg, count } from "drizzle-orm";

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

  getLeaderboard: baseProcedure.query(async ({ ctx }) => {
    const [entries, [{ totalCount }]] = await Promise.all([
      ctx.db
        .select({
          code: roasts.code,
          id: roasts.id,
          language: roasts.language,
          lineCount: roasts.lineCount,
          score: roasts.score,
        })
        .from(roasts)
        .orderBy(asc(roasts.score))
        .limit(3),
      ctx.db.select({ totalCount: count() }).from(roasts),
    ]);

    return {
      entries: entries.map((entry, index) => ({
        code: entry.code,
        id: entry.id,
        language: entry.language,
        lineCount: entry.lineCount,
        rank: index + 1,
        score: Number(entry.score.toFixed(1)),
      })),
      totalCount,
    };
  }),
});
