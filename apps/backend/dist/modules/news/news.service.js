"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let NewsService = class NewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.news.findMany({
            orderBy: { publishedAt: 'desc' },
        });
    }
    async findOne(id) {
        const news = await this.prisma.news.findUnique({
            where: { id },
        });
        if (!news) {
            throw new common_1.NotFoundException(`News with ID ${id} not found`);
        }
        return news;
    }
    async findBySlug(slug) {
        const news = await this.prisma.news.findUnique({
            where: { slug },
        });
        if (!news) {
            throw new common_1.NotFoundException(`News with slug ${slug} not found`);
        }
        return news;
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NewsService);
//# sourceMappingURL=news.service.js.map