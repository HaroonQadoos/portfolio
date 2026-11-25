"use server";

import { z } from "zod";
import { db } from "@/db";
import { projectLikes } from "@/db/schema";
import { projects } from "@/content/site";
import { countLikes, likeWhere, type LikeState } from "@/lib/likes";
import { ensureVisitorId } from "@/lib/visitor";

const slugSchema = z.enum(projects.map((p) => p.slug) as [string, ...string[]]);

export async function toggleLike(rawSlug: string): Promise<LikeState | { error: string }> {
  const parsed = slugSchema.safeParse(rawSlug);
  if (!parsed.success) return { error: "Unknown project." };
  if (!db) return { error: "Likes are unavailable right now." };

  const slug = parsed.data;
  try {
    const visitorId = await ensureVisitorId();
    const removed = await db.delete(projectLikes).where(likeWhere(slug, visitorId)).returning();
    if (removed.length === 0) {
      await db.insert(projectLikes).values({ projectSlug: slug, visitorId }).onConflictDoNothing();
    }
    return { count: await countLikes(slug), liked: removed.length === 0 };
  } catch (error) {
    console.error("toggleLike failed", error);
    return { error: "Could not save your like. Try again." };
  }
}
