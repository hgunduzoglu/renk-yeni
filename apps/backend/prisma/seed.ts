// PATH: prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  // ---------- Admin kullanıcı ----------
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@renk.local" },
    update: {},
    create: { email: "admin@renk.local", passwordHash: hash }
  });

  // ---------- Demo kategori + ürün ----------
  const pergole = await prisma.category.upsert({
    where: { slug: "pergole" },
    create: { name: "Pergole", slug: "pergole" },
    update: {}
  });

  await prisma.product.upsert({
    where: { slug: "forte" },
    update: {},
    create: {
      name: "Forte",
      slug: "forte",
      description: "Zarif yapısıyla …",
      warranty: "Taşıyıcı sistem 5 yıl",
      coverImage: "/uploads/products/forte/main.jpg",
      categoryId: pergole.id
    }
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
