# Renk Gölgelendirme Backend API

Modern NestJS backend API for Renk Gölgelendirme website.

## 🚀 Features

- **NestJS 10** - Modern Node.js framework
- **PostgreSQL** - Robust database with Prisma ORM
- **JWT Authentication** - Secure admin authentication
- **Swagger Documentation** - Auto-generated API docs
- **TypeScript** - Type-safe development
- **File Upload** - Image handling for products and galleries

## 📁 Project Structure

```
src/
├── common/
│   └── prisma/          # Database service
├── modules/
│   ├── auth/            # Authentication
│   ├── category/        # Product categories
│   ├── product/         # Products management
│   ├── news/            # News articles
│   └── gallery/         # Photo galleries
├── app.module.ts        # Main app module
└── main.ts             # Application entry point
```

## 🛠️ Setup Instructions

### 1. Environment Variables

Create `.env` file in the backend root:

```env
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/renk?schema=public"
JWT_SECRET="super_secret_key_for_renk_gölgelendirme_2024"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="super_refresh_secret_key_for_renk_2024"
JWT_REFRESH_EXPIRES_IN="7d"
UPLOAD_DIR="./uploads"
FRONTEND_URL="http://localhost:3000"
```

### 2. Database Setup

You'll need PostgreSQL running. Use Docker:
```bash
docker run --name renk-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=renk -p 5432:5432 -d postgres:16
```

### 3. Install and Setup

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run start:dev
```

## 🔐 Default Admin Login
- Email: `admin@renk.com`
- Password: `admin123`

## 📚 API Documentation
Visit http://localhost:3001/api/docs for interactive Swagger documentation.

## 🎯 Frontend Integration
The API is ready to work with the existing frontend. Set `NEXT_PUBLIC_API_URL=http://localhost:3001/api` in frontend environment.

## 📚 API Endpoints

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category by ID or slug
- `POST /api/categories` - Create category (Auth required)
- `PATCH /api/categories/:id` - Update category (Auth required)
- `DELETE /api/categories/:id` - Delete category (Auth required)

### Products
- `GET /api/products` - List all products
- `GET /api/products?category=slug` - Filter by category
- `GET /api/products/:id` - Get product by ID or slug

### News
- `GET /api/news` - List all news
- `GET /api/news/:id` - Get news by ID or slug

### Gallery
- `GET /api/gallery` - List all albums
- `GET /api/gallery/:id` - Get album by ID or slug

## 🎯 Sample Data

The seed script creates:

### Categories
- Cam (Glass systems)
- Şemsiye (Umbrella systems)
- Pergole (Pergola systems)
- Özel Üretim Gölgelendirme Sistemleri (Custom shading systems)

### Products
- Cam, Fixum, Forte, Luna, Persa, Super Forte, Telescopic Quadro, Telescopic Tondo, Özel Üretim

### Albums
- Gallery albums for each category with sample images

## 🔧 Available Scripts

```bash
npm run start:dev      # Development server with watch mode
npm run start:prod     # Production server
npm run build          # Build for production
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:migrate     # Run migrations
npm run db:seed        # Seed database with sample data
npm run test           # Run tests
```

## 📸 File Upload Structure

Files are served from `/uploads` directory:

```
uploads/
├── products/
│   ├── cam/
│   ├── fixum/
│   └── ...
└── gallery/
    ├── cam/
    ├── pergole/
    └── ...
```

## 🤝 Frontend Integration

The backend is designed to work with the Next.js frontend. Make sure to:

1. Set `NEXT_PUBLIC_API_URL=http://localhost:3001/api` in frontend `.env.local`
2. The API returns data in the format expected by the frontend components
3. Image URLs are relative paths that work with the frontend's image handling

## 🚢 Production Deployment

1. Set production environment variables
2. Use a proper PostgreSQL instance
3. Configure file upload to use cloud storage (S3, etc.)
4. Set up reverse proxy (nginx) for static file serving
5. Use PM2 or similar for process management

```bash
npm run build
npm run start:prod
```

## 📝 Notes

- All endpoints support both ID and slug for resource identification
- Admin endpoints require JWT Bearer token
- Images are served statically from `/uploads` route
- Turkish characters in names are automatically converted to URL-friendly slugs
- Database uses PostgreSQL with Prisma ORM for type safety 