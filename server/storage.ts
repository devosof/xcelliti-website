import {
  type Service, type InsertService,
  type BlogPost, type InsertBlogPost,
  type Job, type InsertJob,
  type ContactSubmission, type InsertContact,
  type Client, type InsertClient,
  type Admin, type InsertAdmin
} from "@shared/schema";

export interface IStorage {
  // Services
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;

  // Blog Posts
  getBlogPosts(includeUnpublished?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  // Jobs
  getJobs(includeInactive?: boolean): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, job: Partial<InsertJob>): Promise<Job>;
  deleteJob(id: number): Promise<void>;

  // Contact Submissions
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createContactSubmission(submission: InsertContact): Promise<ContactSubmission>;

  // Clients
  getClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client>;
  deleteClient(id: number): Promise<void>;

  // Admin
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
}

export class MemStorage implements IStorage {
  private services: Map<number, Service> = new Map();
  private blogPosts: Map<number, BlogPost> = new Map();
  private jobs: Map<number, Job> = new Map();
  private contactSubmissions: Map<number, ContactSubmission> = new Map();
  private clients: Map<number, Client> = new Map();
  private admins: Map<number, Admin> = new Map();
  private currentIds: { [key: string]: number } = {
    services: 1,
    blogPosts: 1,
    jobs: 1,
    contactSubmissions: 1,
    clients: 1,
    admins: 1
  };

  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.currentIds.services++;
    const newService = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const existing = this.services.get(id);
    if (!existing) throw new Error("Service not found");
    const updated = { ...existing, ...service };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: number): Promise<void> {
    this.services.delete(id);
  }

  // Blog Posts
  async getBlogPosts(includeUnpublished = false): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => includeUnpublished || post.isPublished);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentIds.blogPosts++;
    const newPost = { ...post, id, publishedAt: new Date() };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const existing = this.blogPosts.get(id);
    if (!existing) throw new Error("Blog post not found");
    const updated = { ...existing, ...post };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: number): Promise<void> {
    this.blogPosts.delete(id);
  }

  // Jobs
  async getJobs(includeInactive = false): Promise<Job[]> {
    return Array.from(this.jobs.values())
      .filter(job => includeInactive || job.isActive);
  }

  async createJob(job: InsertJob): Promise<Job> {
    const id = this.currentIds.jobs++;
    const newJob = { ...job, id };
    this.jobs.set(id, newJob);
    return newJob;
  }

  async updateJob(id: number, job: Partial<InsertJob>): Promise<Job> {
    const existing = this.jobs.get(id);
    if (!existing) throw new Error("Job not found");
    const updated = { ...existing, ...job };
    this.jobs.set(id, updated);
    return updated;
  }

  async deleteJob(id: number): Promise<void> {
    this.jobs.delete(id);
  }

  // Contact Submissions
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async createContactSubmission(submission: InsertContact): Promise<ContactSubmission> {
    const id = this.currentIds.contactSubmissions++;
    const newSubmission = { ...submission, id, createdAt: new Date() };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  // Clients
  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async createClient(client: InsertClient): Promise<Client> {
    const id = this.currentIds.clients++;
    const newClient = { ...client, id };
    this.clients.set(id, newClient);
    return newClient;
  }

  async updateClient(id: number, client: Partial<InsertClient>): Promise<Client> {
    const existing = this.clients.get(id);
    if (!existing) throw new Error("Client not found");
    const updated = { ...existing, ...client };
    this.clients.set(id, updated);
    return updated;
  }

  async deleteClient(id: number): Promise<void> {
    this.clients.delete(id);
  }

  // Admin
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values())
      .find(admin => admin.username === username);
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const id = this.currentIds.admins++;
    const newAdmin = { ...admin, id };
    this.admins.set(id, newAdmin);
    return newAdmin;
  }
}

export const storage = new MemStorage();
