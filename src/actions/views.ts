"use server";

import { sql } from "drizzle-orm";
import { db } from "@/db";
import { visitors } from "@/db/schema";
import { ensureVisitorId } from "@/lib/visitor";

/** Registers this visitor once (cookie-based) and returns the unique visitor total. */
export async function recordVisit(): Promise<number | null> {
  if (!db) return null;
  try {
    const id = await ensureVisitorId();
    await db.insert(visitors).values({ id }).onConflictDoNothing();
    const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(visitors);
    return row?.count ?? null;
  } catch (error) {
    console.error("recordVisit failed", error);
    return null;
  }
}
