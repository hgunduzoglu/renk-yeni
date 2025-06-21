// PATH: prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ---------- Admin kullanıcı ----------
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@renk.local" },
    update: {},
    create: { email: "admin@renk.local", passwordHash: hash }
  });

  // ---------- Kategoriler ve Ürünler ----------
  const categories = [
    { name: "Pergole", slug: "pergole", coverImage: "/uploads/gallery/pergole/01.jpg" },
    { name: "Cam", slug: "cam", coverImage: "/uploads/products/cam/main.jpg" },
    { name: "Şemsiye", slug: "semsiye", coverImage: "/uploads/gallery/semsiye/01.jpg" },
    { name: "Özel Üretim", slug: "ozel-uretim", coverImage: "/uploads/gallery/ozeluretimgolgelendirmesistemleri/01.jpg" }
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat
    });
  }

  const products = [
    { name: "Forte", slug: "forte", categorySlug: "pergole", coverImage: "/uploads/products/forte/main.jpg", description: "Forte, zarif ve modern yapısıyla mekanlarınıza estetik bir dokunuş katarken, üstün dayanıklılığı ile uzun yıllar kullanım imkanı sunar.", warranty: "5 Yıl Taşıyıcı Sistem" },
    { name: "Persa", slug: "persa", categorySlug: "pergole", coverImage: "/uploads/products/persa/main.jpg", description: "Persa, pergola devrimini başlatan yenilikçi tasarımıyla dikkat çeker. Fonksiyonellik ve şıklığı bir arada sunar.", warranty: "5 Yıl Taşıyıcı Sistem" },
    { name: "Luna", slug: "luna", categorySlug: "pergole", coverImage: "/uploads/products/luna/main.jpg", description: "Luna, minimalist çizgileri ve fonksiyonel kullanımıyla öne çıkar. Her mekana uyum sağlayan yapısıyla fark yaratır.", warranty: "5 Yıl Taşıyıcı Sistem" },
    { name: "Telescopic Quadro", slug: "telescopic-quadro", categorySlug: "semsiye", coverImage: "/uploads/products/telescopicquadro/main.jpg", description: "Geniş alanlar için ideal, teleskopik açılıp kapanma mekanizmasıyla pratik kullanım sunan bir şemsiye modelidir.", warranty: "2 Yıl Mekanizma" },
  ];

  for (const p of products) {
    const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
    if (category) {
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: {},
        create: {
          name: p.name,
          slug: p.slug,
          coverImage: p.coverImage,
          description: p.description,
          warranty: p.warranty,
          categoryId: category.id
        }
      });
    }
  }

  // ---------- Haberler ----------
  await prisma.news.upsert({
    where: { slug: "yeni-websitemiz-yayinda" },
    update: {},
    create: {
      title: "Yeni Websitemiz Yayında!",
      slug: "yeni-websitemiz-yayinda",
      body: "Sizlere daha iyi hizmet verebilmek için modern ve kullanıcı dostu yeni web sitemizle karşınızdayız. Ürünlerimizi ve projelerimizi daha yakından inceleyebilirsiniz.",
      coverImage: "/uploads/slider/202406-hero01.jpg"
    }
  });

  // ---------- Galeri Albümleri ----------
  const albums = [
    { name: "Pergole Uygulamaları", slug: "pergole-uygulamalari", coverImage: "/uploads/gallery/pergole/02.jpg", images: ["/uploads/gallery/pergole/01.jpg", "/uploads/gallery/pergole/02.jpg", "/uploads/gallery/pergole/03.jpg"] },
    { name: "Şemsiye Modelleri", slug: "semsiye-modelleri", coverImage: "/uploads/gallery/semsiye/02.jpg", images: ["/uploads/gallery/semsiye/01.jpg", "/uploads/gallery/semsiye/02.jpg"] },
  ];

  for (const albumData of albums) {
    const album = await prisma.album.upsert({
      where: { slug: albumData.slug },
      update: {},
      create: { name: albumData.name, slug: albumData.slug }
    });
    for (const imageUrl of albumData.images) {
      await prisma.albumImage.create({
        data: {
          albumId: album.id,
          url: imageUrl,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
