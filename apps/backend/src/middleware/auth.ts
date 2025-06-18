// PATH: apps/backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload { uid: number; email: string }

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as any).jwt = payload;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
