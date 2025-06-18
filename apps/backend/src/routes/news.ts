// PATH: apps/backend/src/routes/news.ts
import { Router } from "express";
import { prisma } from "../app";

const r = Router();

/** GET /api/news — son haberler */
r.get("/", async (_req, res) => {
  const list = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  res.json(list);
});

/** GET /api/news/:slug — tek haber */
r.get("/:slug", async (req, res) => {
  const item = await prisma.news.findUnique({ where: { slug: req.params.slug } });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

export default r;
