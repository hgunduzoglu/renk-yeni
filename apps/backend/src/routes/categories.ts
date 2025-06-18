// PATH: apps/backend/src/routes/categories.ts
import { Router } from "express";
import { prisma } from "../app";

const r = Router();

r.get("/", async (_req, res) => {
  const cats = await prisma.category.findMany({
    include: {
      products: {
        select: { id: true, coverImage: true },
        take: 1
      }
    }
  });

  // her kategoriye coverImage alanı ekle
  const out = cats.map((c) => ({
    ...c,
    coverImage: c.products[0]?.coverImage || "/placeholder.jpg"
  }));
  res.json(out);
});

export default r;
