// PATH: apps/backend/src/routes/news.ts
import { Router } from "express";
import { prisma } from "../app";

const router = Router();

/** GET /api/news — son haberler */
router.get("/", async (req, res) => {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(news);
});

/** GET /api/news/:slug — tek haber */
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const newsItem = await prisma.news.findUnique({
    where: { slug },
  });

  if (!newsItem) {
    return res.status(404).json({ error: "News not found." });
  }

  res.json(newsItem);
});

export default router;
