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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let ProductService = class ProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(categorySlug) {
        const where = {};
        if (categorySlug) {
            where.category = { slug: categorySlug };
        }
        return this.prisma.product.findMany({
            where,
            include: {
                category: true,
                images: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                images: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async findBySlug(slug) {
        const product = await this.prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
                images: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with slug ${slug} not found`);
        }
        return product;
    }
    generateSlug(name) {
        return name
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
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map