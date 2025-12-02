import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const shortLinks = pgTable("short_links", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  original: text().notNull(),
  short: varchar({ length: 16 }).notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
});
