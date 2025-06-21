// PATH: apps/backend/src/routes/gallery.ts
import { Router } from "express";
import { prisma } from "../app";

const router = Router();

/** GET /api/gallery — Tüm albümler + ilk görsel */
router.get("/", async (req, res) => {
  const albums = await prisma.album.findMany({
    include: {
      images: {
        take: 1,
        orderBy: { id: "asc" },
      },
    },
  });
  res.json(albums);
});

/** GET /api/gallery/:slug — Albüm içindeki görseller */
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const album = await prisma.album.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { id: "asc" },
      },
    },
  });

  if (!album) {
    return res.status(404).json({ error: "Album not found." });
  }

  res.json(album);
});

export default router;
