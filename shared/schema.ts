import { pgTable, text, serial, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  order: integer("order").notNull()
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  isPublished: boolean("is_published").default(false)
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  location: text("location").notNull(),
  isActive: boolean("is_active").default(true)
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  order: integer("order").notNull()
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});

// Insert Schemas
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, publishedAt: true });
export const insertJobSchema = createInsertSchema(jobs).omit({ id: true });
export const insertContactSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });
export const insertClientSchema = createInsertSchema(clients).omit({ id: true });
export const insertAdminSchema = createInsertSchema(admins).omit({ id: true });

// Types
export type Service = typeof services.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type Admin = typeof admins.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertClient = z.infer<typeof insertClientSchema>;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
