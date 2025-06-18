import { Router } from "express";
import { prisma } from "../app";

const r = Router();

// GET /api/categories
r.get("/", async (_req, res) => {
  const data = await prisma.category.findMany({
    include: { products: { select: { id: true } } },
  });
  res.json(data);
});

export default r;
