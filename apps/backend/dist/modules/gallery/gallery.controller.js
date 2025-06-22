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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const gallery_service_1 = require("./gallery.service");
let GalleryController = class GalleryController {
    galleryService;
    constructor(galleryService) {
        this.galleryService = galleryService;
    }
    findAll() {
        return this.galleryService.findAll();
    }
    async findOne(identifier) {
        const isNumeric = /^\d+$/.test(identifier);
        if (isNumeric) {
            return this.galleryService.findOne(parseInt(identifier));
        }
        else {
            return this.galleryService.findBySlug(identifier);
        }
    }
};
exports.GalleryController = GalleryController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Albums retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GalleryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':identifier'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Album retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Album not found' }),
    __param(0, (0, common_1.Param)('identifier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "findOne", null);
exports.GalleryController = GalleryController = __decorate([
    (0, swagger_1.ApiTags)('gallery'),
    (0, common_1.Controller)('gallery'),
    __metadata("design:paramtypes", [gallery_service_1.GalleryService])
], GalleryController);
//# sourceMappingURL=gallery.controller.js.map