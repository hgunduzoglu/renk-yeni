// PATH: apps/backend/src/routes/gallery.ts
import { Router } from "express";
import { prisma } from "../app";

const r = Router();

/** GET /api/gallery — Tüm albümler + ilk görsel */
r.get("/", async (_req, res) => {
  const albums = await prisma.album.findMany({
    include: { images: { take: 1 } }
  });
  res.json(albums);           // dizi boş dönebilir
});

/** GET /api/gallery/:slug — Albüm içindeki görseller */
r.get("/:slug", async (req, res) => {
  const album = await prisma.album.findUnique({
    where: { slug: req.params.slug },
    include: { images: true }
  });
  if (!album) return res.status(404).json({ message: "Not found" });
  res.json(album);
});

export default r;
