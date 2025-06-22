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
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let GalleryService = class GalleryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.album.findMany({
            include: {
                images: true,
                category: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const album = await this.prisma.album.findUnique({
            where: { id },
            include: {
                images: true,
                category: true,
            },
        });
        if (!album) {
            throw new common_1.NotFoundException(`Album with ID ${id} not found`);
        }
        return album;
    }
    async findBySlug(slug) {
        const album = await this.prisma.album.findUnique({
            where: { slug },
            include: {
                images: true,
                category: true,
            },
        });
        if (!album) {
            throw new common_1.NotFoundException(`Album with slug ${slug} not found`);
        }
        return album;
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map