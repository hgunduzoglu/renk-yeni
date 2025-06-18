import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/auth";
import products from "./routes/products";
import categories from "./routes/categories";
import news from "./routes/news";
import gallery from "./routes/gallery";

export const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/api/news", news);
app.use("/api/gallery", gallery);

export default app;
