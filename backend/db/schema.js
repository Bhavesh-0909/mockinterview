import { pgTable, serial, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";

export const problems = pgTable("problems_dataset", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 512 }),
  input_format: varchar("input_format", { length: 256 }),
  output_format: varchar("output_format", { length: 256 }),
  example: jsonb("example"),
  difficulty: varchar("difficulty", { length: 64 }),
  constraints: varchar("constraints", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  fullname: varchar("fullname", { length: 256 }).notNull(),
  college: varchar("college", { length: 256 }).notNull(),
  contact: varchar("contact", { length: 15 }).unique(),
  resumelink: varchar("resumelink", { length: 512 }),
  credits: integer("credits").default(10),
  createdAt: timestamp("created_at").defaultNow(),
});

export const otp = pgTable("otp", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull(),
  code: varchar("code", { length: 6 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});