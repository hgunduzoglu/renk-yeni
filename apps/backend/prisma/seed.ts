import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@renk.com' },
    update: {},
    create: {
      email: 'admin@renk.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  });

  console.log('👤 Admin user created');

  // Create categories
  const categories = [
    {
      name: 'Cam',
      slug: 'cam',
      description: 'Cam gölgelendirme sistemleri',
      coverImage: '/uploads/products/cam/main.jpg',
    },
    {
      name: 'Şemsiye',
      slug: 'semsiye',
      description: 'Şemsiye sistemleri',
      coverImage: '/uploads/products/fixum/main.jpg',
    },
    {
      name: 'Pergole',
      slug: 'pergole',
      description: 'Pergole sistemleri',
      coverImage: '/uploads/products/persa/main.jpg',
    },
    {
      name: 'Özel Üretim Gölgelendirme Sistemleri',
      slug: 'ozeluretimgolgelendirmesistemleri',
      description: 'Özel üretim gölgelendirme çözümleri',
      coverImage: '/uploads/products/ozeluretimgolgelendirmesistemleri/main.jpg',
    },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
    createdCategories.push(created);
    console.log(`📁 Category created: ${category.name}`);
  }

  // Create products
  const products = [
    {
      name: 'Cam',
      slug: 'cam',
      description: 'Modern cam gölgelendirme sistemi',
      price: 15000.00, // Temsili fiyat
      coverImage: '/uploads/products/cam/main.jpg',
      categorySlug: 'cam',
    },
    {
      name: 'Fixum',
      slug: 'fixum',
      description: 'Sabit şemsiye sistemi',
      price: 8500.00,
      coverImage: '/uploads/products/fixum/main.jpg',
      categorySlug: 'semsiye',
    },
    {
      name: 'Forte',
      slug: 'forte',
      description: 'Güçlü pergole sistemi',
      price: 25000.00,
      coverImage: '/uploads/products/forte/main.jpg',
      categorySlug: 'pergole',
    },
    {
      name: 'Luna',
      slug: 'luna',
      description: 'Elegant pergole sistemi',
      price: 18500.00,
      coverImage: '/uploads/products/luna/main.jpg',
      categorySlug: 'pergole',
    },
    {
      name: 'Persa',
      slug: 'persa',
      description: 'Premium pergole sistemi',
      price: 32000.00,
      coverImage: '/uploads/products/persa/main.jpg',
      categorySlug: 'pergole',
    },
    {
      name: 'Super Forte',
      slug: 'superforte',
      description: 'Süper güçlü pergole sistemi',
      price: 38500.00,
      coverImage: '/uploads/products/superforte/main.jpg',
      categorySlug: 'pergole',
    },
    {
      name: 'Telescopic Quadro',
      slug: 'telescopicquadro',
      description: 'Teleskopik kare şemsiye',
      price: 12000.00,
      coverImage: '/uploads/products/telescopicquadro/main.jpg',
      categorySlug: 'semsiye',
    },
    {
      name: 'Telescopic Tondo',
      slug: 'telescopictondo',
      description: 'Teleskopik yuvarlak şemsiye',
      price: 10500.00,
      coverImage: '/uploads/products/telescopictondo/main.jpg',
      categorySlug: 'semsiye',
    },
    {
      name: 'Özel Üretim Gölgelendirme Sistemleri',
      slug: 'ozeluretimgolgelendirmesistemleri',
      description: 'Müşteri ihtiyaçlarına özel tasarlanmış gölgelendirme çözümleri',
      price: 50000.00,
      coverImage: '/uploads/products/ozeluretimgolgelendirmesistemleri/main.jpg',
      categorySlug: 'ozeluretimgolgelendirmesistemleri',
    },
  ];

  for (const product of products) {
    const category = createdCategories.find(c => c.slug === product.categorySlug);
    if (category) {
      const created = await prisma.product.upsert({
        where: { slug: product.slug },
        update: {
          name: product.name,
          description: product.description,
          price: product.price,
          coverImage: product.coverImage,
          categoryId: category.id,
        },
        create: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          coverImage: product.coverImage,
          categoryId: category.id,
        },
      });

      // Add product images
      const imageUrls = [
        `/uploads/products/${product.slug}/01.jpg`,
        `/uploads/products/${product.slug}/02.jpg`,
      ];

      for (const url of imageUrls) {
        await prisma.productImage.upsert({
          where: {
            // Use a compound unique constraint if it exists, or create individual records
            url_productId: {
              url,
              productId: created.id,
            },
          },
          update: {},
          create: {
            url,
            productId: created.id,
          },
        });
      }

      console.log(`📦 Product created: ${product.name}`);
    }
  }

  // Create albums for gallery
  const albums = [
    {
      name: 'Cam',
      slug: 'cam',
      description: 'Cam sistemleri galeri',
      categorySlug: 'cam',
    },
    {
      name: 'Özel Üretim Gölgelendirme Sistemleri',
      slug: 'ozeluretimgolgelendirmesistemleri',
      description: 'Özel üretim projeler galeri',
      categorySlug: 'ozeluretimgolgelendirmesistemleri',
    },
    {
      name: 'Pergole',
      slug: 'pergole',
      description: 'Pergole sistemleri galeri',
      categorySlug: 'pergole',
    },
    {
      name: 'Şemsiye',
      slug: 'semsiye',
      description: 'Şemsiye sistemleri galeri',
      categorySlug: 'semsiye',
    },
  ];

  for (const album of albums) {
    const category = createdCategories.find(c => c.slug === album.categorySlug);
    if (category) {
      const created = await prisma.album.upsert({
        where: { slug: album.slug },
        update: {
          name: album.name,
          description: album.description,
          categoryId: category.id,
        },
        create: {
          name: album.name,
          slug: album.slug,
          description: album.description,
          categoryId: category.id,
        },
      });

      // Add album images
      const imageCount = album.slug === 'pergole' ? 30 : album.slug === 'ozeluretimgolgelendirmesistemleri' ? 14 : album.slug === 'semsiye' ? 13 : 8;
      
      for (let i = 1; i <= imageCount; i++) {
        const imageNumber = i.toString().padStart(2, '0');
        const url = `/uploads/gallery/${album.slug}/${imageNumber}.jpg`;
        
        await prisma.albumImage.upsert({
          where: {
            url_albumId: {
              url,
              albumId: created.id,
            },
          },
          update: {},
          create: {
            url,
            albumId: created.id,
          },
        });
      }

      console.log(`🖼️ Album created: ${album.name} with ${imageCount} images`);
    }
  }

  // Create sample news
  const news = [
    {
      title: 'Yeni Pergole Sistemleri',
      slug: 'yeni-pergole-sistemleri',
      body: '<p>Yeni pergole sistemlerimiz ile açık alanlarınızı daha konforlu hale getirin.</p><p>Modern tasarım ve dayanıklı malzemeler ile üretilen pergole sistemlerimiz, her türlü hava koşuluna karşı mükemmel koruma sağlar.</p>',
      coverImage: '/uploads/slider/202406-hero01.jpg',
    },
    {
      title: 'Şemsiye Sistemleri Yenilendi',
      slug: 'semsiye-sistemleri-yenilendi',
      body: '<p>Şemsiye sistemlerimizde yeni teknolojiler kullanarak daha dayanıklı ve estetik ürünler sunuyoruz.</p><p>Rüzgara karşı geliştirilmiş mekanizmalar ile güvenli kullanım garantisi veriyoruz.</p>',
      coverImage: '/uploads/slider/202406-hero02.jpg',
    },
  ];

  for (const newsItem of news) {
    await prisma.news.upsert({
      where: { slug: newsItem.slug },
      update: newsItem,
      create: newsItem,
    });
    console.log(`📰 News created: ${newsItem.title}`);
  }

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 