import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { projectLikes } from "@/db/schema";

export type LikeState = { count: number; liked: boolean };

/** Like counts for every project, plus whether this visitor liked each one. */
export async function getLikes(visitorId: string | null): Promise<Record<string, LikeState>> {
  if (!db) return {};
  try {
    const rows = await db
      .select({
        slug: projectLikes.projectSlug,
        count: sql<number>`count(*)::int`,
        liked: visitorId
          ? sql<boolean>`coalesce(bool_or(${projectLikes.visitorId} = ${visitorId}), false)`
          : sql<boolean>`false`,
      })
      .from(projectLikes)
      .groupBy(projectLikes.projectSlug);
    return Object.fromEntries(rows.map((r) => [r.slug, { count: r.count, liked: r.liked }]));
  } catch (error) {
    console.error("getLikes failed", error);
    return {};
  }
}

export async function countLikes(slug: string) {
  if (!db) return 0;
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(projectLikes)
    .where(eq(projectLikes.projectSlug, slug));
  return row?.count ?? 0;
}

export const likeWhere = (slug: string, visitorId: string) =>
  and(eq(projectLikes.projectSlug, slug), eq(projectLikes.visitorId, visitorId));
