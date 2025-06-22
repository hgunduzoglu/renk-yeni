# Renk Gölgelendirme – Monorepo Teknik Dokümantasyon  
*(Next.js Frontend + NestJS Backend + PostgreSQL / Prisma)*  

---

## İçindekiler
1. [Proje Özeti](#proje-özeti)  
2. [Teknoloji Yığını](#teknoloji-yığını)  
3. [Dizin Yapısı](#dizin-yapısı)  
4. [Ortam Değişkenleri](#ortam-değişkenleri)  
5. [Prisma Şeması](#prisma-şeması)  
6. [API Tasarımı](#api-tasarımı)  
7. [Kurulum & Çalıştırma](#kurulum--çalıştırma)  
8. [Admin Paneli](#admin-paneli)  
9. [Test & CI](#test--ci)  
10. [Deployment](#deployment)  
11. [Katkı & Lisans](#katkı--lisans)  

---

## Proje Özeti
| | Açıklama |
|---|---|
| **Amaç** | Eski Dreamweaver-PHP sitesini modern, kolay güncellenebilir ve ölçeklenebilir tam yığın yapıya taşımak |
| **Frontend** | Next.js 14 (App Router, TypeScript, Tailwind, Zustand) |
| **Backend** | NestJS 10 (TypeScript, REST) |
| **Veri Tabanı** | PostgreSQL 16 (Docker) |
| **ORM** | Prisma |
| **Kimlik Doğrulama** | JWT (Access — 15 dk, Refresh — 7 gün) |
| **Medya Deposu** | Geliştirme: `uploads/` klasörü • Prod: S3/MinIO |
| **Admin İşlevleri** | Kategori/Alt kategori, Ürün, Haber, Galeri CRUD |
| **Site Sayfaları** | Ana sayfa – Hakkımızda – Ürünlerimiz – Haberler – Galeri – İletişim |

---

## Teknoloji Yığını
| Katman | Teknoloji | Kilit Paketler |
|--------|-----------|----------------|
| **UI** | Next.js 14, React 18 | `next`, `react`, `@tailwindcss` |
| **API** | NestJS 10 | `@nestjs/common`, `@nestjs/config`, `@nestjs/jwt`, `@nestjs/swagger`, `@nestjs/platform-express` |
| **ORM** | Prisma 5 | `@prisma/client`, `prisma` |
| **DB** | PostgreSQL 16 (Docker resmi imajı) |  |
| **Upload** | Multer adapter → Lokal/S3 | `@nestjs/platform-express`, `multer-s3` |
| **Test** | Jest + Supertest | `jest`, `@nestjs/testing`, `supertest` |
| **CI** | GitHub Actions | Lint → Test → Build → Push image |

---

## Dizin Yapısı

```text
renk-monorepo/
│
├─ renk-frontend/            # Next.js (hazır)
│
└─ renk-backend/
   ├─ src/
   │  ├─ main.ts
   │  ├─ app.module.ts
   │  ├─ modules/
   │  │  ├─ auth/
   │  │  ├─ category/
   │  │  ├─ product/
   │  │  ├─ gallery/
   │  │  ├─ news/
   │  │  └─ admin/
   │  └─ common/
   ├─ prisma/
   │  ├─ schema.prisma
   │  └─ seed.ts
   ├─ uploads/                # DEV dosyaları
   ├─ docker-compose.yml
   ├─ Dockerfile
   └─ README.md
   # .env (backend kök)
PORT=3001

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/renk?schema=public"

# JWT
JWT_SECRET="super_secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="super_refresh"
JWT_REFRESH_EXPIRES_IN="7d"

# Upload
UPLOAD_DIR="./uploads"        # dev

// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Category {
  id        Int        @id @default(autoincrement())
  name      String
  parentId  Int?
  parent    Category?  @relation("SubCategories", fields: [parentId], references: [id])
  children  Category[] @relation("SubCategories")
  products  Product[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model Product {
  id          Int       @id @default(autoincrement())
  name        String
  description String
  coverUrl    String
  categoryId  Int
  category    Category  @relation(fields: [categoryId], references: [id])
  gallery     Gallery[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Gallery {
  id        Int      @id @default(autoincrement())
  imageUrl  String
  productId Int
  product   Product  @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())
}

model News {
  id          Int      @id @default(autoincrement())
  title       String
  content     String
  coverUrl    String
  publishedAt DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Admin {
  id       Int    @id @default(autoincrement())
  email    String @unique
  password String
  createdAt DateTime @default(now())
}

Base URL: https://api.renkgolgelendirme.com.tr/api/
JWT Authorization: Bearer <token> gerekli endpointlerde belirtilmiştir.


API Tasarımı
Auth
Metod	Endpoint	Body	Açıklama	Dönüş
POST	/auth/login	{ email, password }	Admin girişi	{ accessToken, refreshToken }
POST	/auth/refresh	{ refreshToken }	Token yenileme	{ accessToken }

Kategori
Metod	Endpoint	Query/Body	Açıklama
GET	/categories	parentId opsiyonel	Ana veya alt kategorileri getir
GET	/categories/:id	–	Tek kategori (altları dahil)
POST	/categories	{ name, parentId? }	JWT – Kategori oluştur
PUT	/categories/:id	{ name, parentId? }	JWT – Kategori güncelle
DELETE	/categories/:id	–	JWT – Sil

Ürün
Metod	Endpoint	Açıklama
GET	/products	Filtre: categoryId
GET	/products/:id	Ürün + galeri
POST	/products	JWT – multipart/form-data → alanlar: name, description, categoryId, cover (file), images[]
PUT	/products/:id	JWT – (tekst + yeni resimler)
DELETE	/products/:id	JWT

Galeri (Ana kategori bazlı)
Metod	Endpoint	Açıklama
GET	/gallery	categoryId ⇒ tüm alt ürünlere ait görseller
POST	/gallery	JWT – multipart/form-data → categoryId, image


Haberler
Metod	Endpoint	Açıklama
GET	/news	Son haberler
GET	/news/:id	Haber detayı
POST	/news	JWT – multipart/form-data → title, content (HTML), cover
PUT	/news/:id	JWT
DELETE	/news/:id	JWT



Örnek İstek /products POST
POST /api/products HTTP/1.1
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data; boundary=---XYZ

---XYZ
Content-Disposition: form-data; name="name"

Super Forte
---XYZ
Content-Disposition: form-data; name="description"

Geniş alanlar için güçlü yapı...
---XYZ
Content-Disposition: form-data; name="categoryId"

126   # Pergole ID
---XYZ
Content-Disposition: form-data; name="cover"; filename="cover.jpg"
Content-Type: image/jpeg

...binary...
---XYZ
Content-Disposition: form-data; name="images"; filename="1.jpg"
Content-Type: image/jpeg

...binary...
---XYZ--

Başarılı 200 OK dönüşü:
{
  "id": 189,
  "name": "Super Forte",
  "categoryId": 126,
  "coverUrl": "https://cdn.renk/189/cover.jpg",
  "gallery": [
    "https://cdn.renk/189/1.jpg"
  ]
}

Deployment ortamı: Sanal sunucu (debian)
Mevcut işletim sistemi: windows