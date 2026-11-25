import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

/** One row per unique visitor (cookie id). Row count = visitor counter. */
export const visitors = pgTable("visitors", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/** One row per visitor per liked project, so a visitor can like a project only once. */
export const projectLikes = pgTable(
  "project_likes",
  {
    projectSlug: text("project_slug").notNull(),
    visitorId: text("visitor_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.projectSlug, t.visitorId] })],
);
