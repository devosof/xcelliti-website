import { db } from "./db";
import {
  services,
  blogPosts,
  clients,
  partners,
  admins
} from "@shared/schema";
import bcrypt from "bcryptjs";

async function seed() {
  // Seed services
  await db.insert(services).values([
    {
      title: "Custom Software Development",
      description: "Tailored software solutions to meet your unique business needs with cutting-edge technology and best practices.",
      image: "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?auto=format&fit=crop&w=1000&q=80",
      order: 1
    },
    {
      title: "Quality Assurance & Testing",
      description: "Comprehensive testing services to ensure your software meets the highest quality standards.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80",
      order: 2
    },
    {
      title: "IT Consulting & Strategy",
      description: "Strategic technology consulting to help your business achieve its digital transformation goals.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80",
      order: 3
    }
  ]);

  // Seed clients
  await db.insert(clients).values([
    {
      name: "TechCorp Global",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=techcorp",
      order: 1,
      description: "Leading technology solutions provider",
      website: "https://example.com"
    },
    {
      name: "InnovateSoft",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=innovatesoft",
      order: 2,
      description: "Innovation-driven software company",
      website: "https://example.com"
    },
    {
      name: "Digital Dynamics",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=digitaldynamics",
      order: 3,
      description: "Digital transformation experts",
      website: "https://example.com"
    }
  ]);

  // Seed blog posts
  await db.insert(blogPosts).values([
    {
      title: "The Future of Software Development: Trends to Watch",
      content: "As technology continues to evolve at an unprecedented pace...",
      author: "John Smith",
      publishedAt: new Date(),
      isPublished: true,
      thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1000&q=80",
      excerpt: "Explore the emerging trends shaping the future of software development",
      category: "Technology"
    },
    {
      title: "Best Practices in Quality Assurance",
      content: "Quality assurance is a critical component of software development...",
      author: "Jane Doe",
      publishedAt: new Date(),
      isPublished: true,
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
      excerpt: "Learn about the latest QA methodologies and best practices",
      category: "Testing"
    }
  ]);

  // Seed partners
  await db.insert(partners).values([
    {
      name: "Microsoft",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=microsoft",
      order: 1,
      description: "Cloud and enterprise solutions partner",
      website: "https://microsoft.com",
      isActive: true
    },
    {
      name: "AWS",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=aws",
      order: 2,
      description: "Cloud infrastructure partner",
      website: "https://aws.amazon.com",
      isActive: true
    }
  ]);

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await db.insert(admins).values({
    username: "admin",
    password: hashedPassword,
    email: "admin@xcelliti.com",
    role: "admin"
  });

  console.log("Database seeded successfully!");
}

seed().catch(console.error);