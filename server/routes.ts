import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServiceSchema, insertBlogPostSchema, insertJobSchema, insertContactSchema, insertClientSchema, insertAdminSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  // Services
  app.get("/api/services", async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.post("/api/services", async (req, res) => {
    const parsed = insertServiceSchema.parse(req.body);
    const service = await storage.createService(parsed);
    res.json(service);
  });

  app.patch("/api/services/:id", async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    const parsed = insertServiceSchema.partial().parse(req.body);
    const service = await storage.updateService(id, parsed);
    res.json(service);
  });

  app.delete("/api/services/:id", async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    await storage.deleteService(id);
    res.status(204).end();
  });

  // Blog Posts
  app.get("/api/blog-posts", async (req, res) => {
    const includeUnpublished = req.query.includeUnpublished === "true";
    const posts = await storage.getBlogPosts(includeUnpublished);
    res.json(posts);
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    const post = await storage.getBlogPost(id);
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    res.json(post);
  });

  app.post("/api/blog-posts", async (req, res) => {
    const parsed = insertBlogPostSchema.parse(req.body);
    const post = await storage.createBlogPost(parsed);
    res.json(post);
  });

  app.patch("/api/blog-posts/:id", async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    const parsed = insertBlogPostSchema.partial().parse(req.body);
    const post = await storage.updateBlogPost(id, parsed);
    res.json(post);
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
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

  app.post("/api/jobs", async (req, res) => {
    const parsed = insertJobSchema.parse(req.body);
    const job = await storage.createJob(parsed);
    res.json(job);
  });

  app.patch("/api/jobs/:id", async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    const parsed = insertJobSchema.partial().parse(req.body);
    const job = await storage.updateJob(id, parsed);
    res.json(job);
  });

  app.delete("/api/jobs/:id", async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    await storage.deleteJob(id);
    res.status(204).end();
  });

  // Contact Submissions
  app.get("/api/contact-submissions", async (_req, res) => {
    const submissions = await storage.getContactSubmissions();
    res.json(submissions);
  });

  app.post("/api/contact", async (req, res) => {
    const parsed = insertContactSchema.parse(req.body);
    const submission = await storage.createContactSubmission(parsed);
    res.json(submission);
  });

  // Clients
  app.get("/api/clients", async (_req, res) => {
    const clients = await storage.getClients();
    res.json(clients);
  });

  app.post("/api/clients", async (req, res) => {
    const parsed = insertClientSchema.parse(req.body);
    const client = await storage.createClient(parsed);
    res.json(client);
  });

  app.patch("/api/clients/:id", async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    const parsed = insertClientSchema.partial().parse(req.body);
    const client = await storage.updateClient(id, parsed);
    res.json(client);
  });

  app.delete("/api/clients/:id", async (req, res) => {
    const id = z.number().parse(parseInt(req.params.id));
    await storage.deleteClient(id);
    res.status(204).end();
  });

  // Admin Auth
  app.post("/api/admin/login", async (req, res) => {
    const parsed = insertAdminSchema.parse(req.body);
    const admin = await storage.getAdminByUsername(parsed.username);
    if (!admin || admin.password !== parsed.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Logged in successfully" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
