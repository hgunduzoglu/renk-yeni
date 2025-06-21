import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import categoriesRoutes from "./routes/categories";
import productsRoutes from "./routes/products";
import newsRoutes from "./routes/news";
import galleryRoutes from "./routes/gallery";

export const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// API Rotaları
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/gallery", galleryRoutes);

export default app;
