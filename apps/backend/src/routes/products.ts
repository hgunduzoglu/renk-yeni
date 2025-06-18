// PATH: apps/backend/src/routes/products.ts
import { Router } from "express";
import { prisma } from "../app";

const r = Router();

// ?category=pergole → liste
r.get("/", async (req, res) => {
  const where = req.query.category
    ? { category: { slug: String(req.query.category) } }
    : {};
  const products = await prisma.product.findMany({
    where, include: { category: true }
  });
  res.json(products);
});

// /products/:slug
r.get("/:slug", async (req, res) => {
  const p = await prisma.product.findUnique({
    where: { slug: req.params.slug }
  });
  if (!p) return res.status(404).json({ message: "Not found" });
  res.json(p);
});

export default r;
