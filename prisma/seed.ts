import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  // Örnek kategori
  const pergole = await prisma.category.create({
    data: { name: "Pergole", slug: "pergole" },
  });

  // Örnek ürün
  await prisma.product.create({
    data: {
      name: "Forte",
      slug: "forte",
      description: "Zarif yapısıyla ...",
      warranty: "Taşıyıcı sistem 5 yıl",
      coverImage: "/uploads/products/forte/main.jpg",
      categoryId: pergole.id,
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
