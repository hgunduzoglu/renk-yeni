// PATH: apps/backend/src/routes/auth.ts
import { Router } from "express";
import { prisma } from "../app";
import bcrypt from "bcryptjs";
import { sign, refresh } from "../utils/jwt";

const r = Router();

/**
 * POST /api/auth/login { email, password }
 */
r.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json({ message: "Wrong creds" });

  res.json({ token: sign(user), refresh: refresh(user) });
});

/**
 * POST /api/auth/refresh { refresh }
 */
r.post("/refresh", async (req, res) => {
  const { refresh: token } = req.body;
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await prisma.adminUser.findUnique({ where: { id: decoded.uid } });
    if (!user) throw new Error("User not found");
    res.json({ token: sign(user) });
  } catch {
    res.status(401).json({ message: "Invalid refresh" });
  }
});

export default r;
