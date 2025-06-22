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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let CategoryService = class CategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        const slug = this.generateSlug(createCategoryDto.name);
        return this.prisma.category.create({
            data: {
                ...createCategoryDto,
                slug,
            },
            include: {
                parent: true,
                children: true,
                _count: {
                    select: { products: true },
                },
            },
        });
    }
    async findAll(parentId) {
        const where = parentId ? { parentId } : { parentId: null };
        return this.prisma.category.findMany({
            where,
            include: {
                parent: true,
                children: true,
                _count: {
                    select: { products: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
                products: {
                    include: {
                        images: true,
                    },
                },
                _count: {
                    select: { products: true },
                },
            },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async findBySlug(slug) {
        const category = await this.prisma.category.findUnique({
            where: { slug },
            include: {
                parent: true,
                children: true,
                products: {
                    include: {
                        images: true,
                    },
                },
                _count: {
                    select: { products: true },
                },
            },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with slug ${slug} not found`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOne(id);
        const data = { ...updateCategoryDto };
        if (updateCategoryDto.name) {
            data.slug = this.generateSlug(updateCategoryDto.name);
        }
        return this.prisma.category.update({
            where: { id },
            data,
            include: {
                parent: true,
                children: true,
                _count: {
                    select: { products: true },
                },
            },
        });
    }
    async remove(id) {
        const category = await this.findOne(id);
        return this.prisma.category.delete({
            where: { id },
        });
    }
    async moveProductToCategory(productId, categoryId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { category: true },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        const category = await this.prisma.category.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${categoryId} not found`);
        }
        return this.prisma.product.update({
            where: { id: productId },
            data: { categoryId },
            include: {
                category: true,
                images: true,
            },
        });
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
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map