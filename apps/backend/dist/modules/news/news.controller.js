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
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const news_service_1 = require("./news.service");
let NewsController = class NewsController {
    newsService;
    constructor(newsService) {
        this.newsService = newsService;
    }
    findAll() {
        return this.newsService.findAll();
    }
    async findOne(identifier) {
        const isNumeric = /^\d+$/.test(identifier);
        if (isNumeric) {
            return this.newsService.findOne(parseInt(identifier));
        }
        else {
            return this.newsService.findBySlug(identifier);
        }
    }
};
exports.NewsController = NewsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'News retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':identifier'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'News retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'News not found' }),
    __param(0, (0, common_1.Param)('identifier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findOne", null);
exports.NewsController = NewsController = __decorate([
    (0, swagger_1.ApiTags)('news'),
    (0, common_1.Controller)('news'),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
//# sourceMappingURL=news.controller.js.map