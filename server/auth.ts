import { storage } from "./storage";
import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";

export async function authenticateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const admin = req.session.admin;
  if (!admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function adminLogin(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const admin = await storage.getAdminByUsername(username);
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.admin = admin;
    res.json({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function adminLogout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
}

export async function getCurrentAdmin(req: Request, res: Response) {
  const admin = req.session.admin;
  if (!admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
  });
}