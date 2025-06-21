// PATH: apps/backend/src/routes/categories.ts
import { Router } from "express";
import { prisma } from "../app";

const router = Router();

// Tüm kategorileri getir (ürün sayısıyla birlikte)
router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
      products: {
        take: 1,
        select: { coverImage: true }
      }
    },
  });
  res.json(categories);
});

// Tek bir kategoriyi slug ile getir
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  res.json(category);
});

export default router;
