import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertServiceSchema,
  insertBlogPostSchema,
  insertJobSchema,
  insertContactSchema,
  insertClientSchema,
  insertPartnerSchema,
} from "@shared/schema";
import { z } from "zod";
import {
  authenticateAdmin,
  adminLogin,
  adminLogout,
  getCurrentAdmin,
} from "./auth";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    admin: {
      id: number;
      username: string;
      email: string;
      role: string;
    };
  }
}

export function registerRoutes(app: Express): Server {
  // Session middleware
  app.use(
    session({
      secret: process.env.REPL_ID!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Admin Auth Routes
  app.post("/api/admin/login", adminLogin);
  app.post("/api/admin/logout", adminLogout);
  app.get("/api/admin/me", getCurrentAdmin);

  // Protected Admin Routes
  app.post("/api/services", authenticateAdmin, async (req, res) => {
    const parsed = insertServiceSchema.parse(req.body);
    const service = await storage.createService(parsed);
    res.json(service);
  });

  app.patch("/api/services/:id", authenticateAdmin, async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    const parsed = insertServiceSchema.partial().parse(req.body);
    const service = await storage.updateService(id, parsed);
    res.json(service);
  });

  app.delete("/api/services/:id", authenticateAdmin, async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    await storage.deleteService(id);
    res.status(204).end();
  });

  // Public Routes
  app.get("/api/services", async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  // Blog Posts
  app.get("/api/blog-posts", async (req, res) => {
    const includeUnpublished = req.query.includeUnpublished === "true";
    const posts = await storage.getBlogPosts(includeUnpublished);
    res.json(posts);
  });

  app.post("/api/blog-posts", authenticateAdmin, async (req, res) => {
    const parsed = insertBlogPostSchema.parse(req.body);
    const post = await storage.createBlogPost(parsed);
    res.json(post);
  });

  app.patch("/api/blog-posts/:id", authenticateAdmin, async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    const parsed = insertBlogPostSchema.partial().parse(req.body);
    const post = await storage.updateBlogPost(id, parsed);
    res.json(post);
  });

  app.delete("/api/blog-posts/:id", authenticateAdmin, async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    await storage.deleteBlogPost(id);
    res.status(204).end();
  });

  // Jobs
  app.get("/api/jobs", async (req, res) => {
    const includeInactive = req.query.includeInactive === "true";
    const jobs = await storage.getJobs(includeInactive);
    res.json(jobs);
  });

  app.post("/api/jobs", authenticateAdmin, async (req, res) => {
    const parsed = insertJobSchema.parse(req.body);
    const job = await storage.createJob(parsed);
    res.json(job);
  });

  app.patch("/api/jobs/:id", authenticateAdmin, async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    const parsed = insertJobSchema.partial().parse(req.body);
    const job = await storage.updateJob(id, parsed);
    res.json(job);
  });

  app.delete("/api/jobs/:id", authenticateAdmin, async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    await storage.deleteJob(id);
    res.status(204).end();
  });

  // Clients
  app.get("/api/clients", async (_req, res) => {
    const clients = await storage.getClients();
    res.json(clients);
  });

  app.post("/api/clients", authenticateAdmin, async (req, res) => {
    const parsed = insertClientSchema.parse(req.body);
    const client = await storage.createClient(parsed);
    res.json(client);
  });

  app.patch("/api/clients/:id", authenticateAdmin, async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    const parsed = insertClientSchema.partial().parse(req.body);
    const client = await storage.updateClient(id, parsed);
    res.json(client);
  });

  app.delete("/api/clients/:id", authenticateAdmin, async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    await storage.deleteClient(id);
    res.status(204).end();
  });

  // Partners
  app.get("/api/partners", async (_req, res) => {
    const partners = await storage.getPartners();
    res.json(partners);
  });

  app.post("/api/partners", authenticateAdmin, async (req, res) => {
    const parsed = insertPartnerSchema.parse(req.body);
    const partner = await storage.createPartner(parsed);
    res.json(partner);
  });

  app.patch("/api/partners/:id", authenticateAdmin, async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    const parsed = insertPartnerSchema.partial().parse(req.body);
    const partner = await storage.updatePartner(id, parsed);
    res.json(partner);
  });

  app.delete("/api/partners/:id", authenticateAdmin, async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    await storage.deletePartner(id);
    res.status(204).end();
  });

  // Contact Submissions (public create, admin read)
  app.post("/api/contact", async (req, res) => {
    const parsed = insertContactSchema.parse(req.body);
    const submission = await storage.createContactSubmission(parsed);
    res.json(submission);
  });

  app.get("/api/contact-submissions", authenticateAdmin, async (_req, res) => {
    const submissions = await storage.getContactSubmissions();
    res.json(submissions);
  });

  const httpServer = createServer(app);
  return httpServer;
}