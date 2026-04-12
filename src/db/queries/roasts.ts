import { asc, avg, count, eq } from "drizzle-orm";

import { db } from "@/db";
import { analysisItems, roasts } from "@/db/schema";

type CreateRoastInput = {
  code: string;
  language: string;
  lineCount: number;
  roastMode: boolean;
  score: number;
  verdict:
    | "needs_serious_help"
    | "rough_around_edges"
    | "decent_code"
    | "solid_work"
    | "exceptional";
  roastQuote?: string;
  suggestedFix?: string;
  items: Array<{
    severity: "critical" | "warning" | "good";
    title: string;
    description: string;
  }>;
};

export async function getLeaderboard(limit = 20) {
  return db.select().from(roasts).orderBy(asc(roasts.score)).limit(limit);
}

export async function getRoastById(roastId: string) {
  const [roast] = await db.select().from(roasts).where(eq(roasts.id, roastId));
  return roast ?? null;
}

export async function getAnalysisItemsByRoastId(roastId: string) {
  return db
    .select()
    .from(analysisItems)
    .where(eq(analysisItems.roastId, roastId))
    .orderBy(asc(analysisItems.order));
}

export async function getRoastWithItems(roastId: string) {
  const rows = await db
    .select({
      roast: roasts,
      item: analysisItems,
    })
    .from(roasts)
    .leftJoin(analysisItems, eq(analysisItems.roastId, roasts.id))
    .where(eq(roasts.id, roastId))
    .orderBy(asc(analysisItems.order));

  if (!rows[0]) {
    return null;
  }

  const items = rows
    .map((row) => row.item)
    .filter((item): item is typeof analysisItems.$inferSelect => item !== null);

  return {
    roast: rows[0].roast,
    items,
  };
}

export async function getRoastStats() {
  const [stats] = await db
    .select({
      totalRoasts: count(),
      avgScore: avg(roasts.score),
    })
    .from(roasts);

  return stats;
}

export async function createRoastWithItems(input: CreateRoastInput) {
  return db.transaction(async (tx) => {
    const [roast] = await tx
      .insert(roasts)
      .values({
        code: input.code,
        language: input.language,
        lineCount: input.lineCount,
        roastMode: input.roastMode,
        score: input.score,
        verdict: input.verdict,
        roastQuote: input.roastQuote,
        suggestedFix: input.suggestedFix,
      })
      .returning();

    await tx.insert(analysisItems).values(
      input.items.map((item, index) => ({
        roastId: roast.id,
        severity: item.severity,
        title: item.title,
        description: item.description,
        order: index,
      })),
    );

    return roast;
  });
}
