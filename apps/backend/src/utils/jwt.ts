// PATH: apps/backend/src/utils/jwt.ts
import jwt from "jsonwebtoken";
import { AdminUser } from "@prisma/client";

export function sign(user: AdminUser) {
  return jwt.sign(
    { uid: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "15m" }
  );
}

export function refresh(user: AdminUser) {
  return jwt.sign(
    { uid: user.id }, process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
}
