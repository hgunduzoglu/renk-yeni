// PATH: apps/backend/src/routes/products.ts
import { Router } from "express";
import { prisma } from "../app";

const router = Router();

// Bir kategoriye ait ürünleri getir
router.get("/", async (req, res) => {
  const { category: categorySlug } = req.query;

  if (typeof categorySlug !== "string") {
    return res.status(400).json({ error: "Category slug must be a string." });
  }

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
    },
    include: {
      category: true,
    },
  });

  res.json(products);
});

// Tek bir ürünü slug ile getir
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: true, // Ürüne ait diğer resimleri de dahil et
      category: true,
    },
  });

  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }

  res.json(product);
});

export default router;
