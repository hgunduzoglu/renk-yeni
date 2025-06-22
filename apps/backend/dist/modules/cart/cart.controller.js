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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_service_1 = require("./cart.service");
const add_to_cart_dto_1 = require("./dto/add-to-cart.dto");
const create_order_dto_1 = require("./dto/create-order.dto");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    addToCart(addToCartDto) {
        return this.cartService.addToCart(addToCartDto);
    }
    getCart(sessionId) {
        return this.cartService.getCart(sessionId);
    }
    updateCartItem(productId, sessionId, quantity) {
        return this.cartService.updateCartItem(sessionId, productId, quantity);
    }
    removeFromCart(productId, sessionId) {
        return this.cartService.removeFromCart(sessionId, productId);
    }
    clearCart(sessionId) {
        return this.cartService.clearCart(sessionId);
    }
    createOrder(createOrderDto) {
        return this.cartService.createOrder(createOrderDto);
    }
    getOrders() {
        return this.cartService.getOrders();
    }
    getOrder(id) {
        return this.cartService.getOrder(id);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)('add'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Item added to cart successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'sessionId', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart retrieved successfully' }),
    __param(0, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Put)('update/:productId'),
    (0, swagger_1.ApiQuery)({ name: 'sessionId', required: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'quantity', required: true, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart item updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cart item not found' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('sessionId')),
    __param(2, (0, common_1.Query)('quantity', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "updateCartItem", null);
__decorate([
    (0, common_1.Delete)('remove/:productId'),
    (0, swagger_1.ApiQuery)({ name: 'sessionId', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item removed from cart successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cart item not found' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Delete)('clear'),
    (0, swagger_1.ApiQuery)({ name: 'sessionId', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart cleared successfully' }),
    __param(0, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "clearCart", null);
__decorate([
    (0, common_1.Post)('checkout'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cart is empty or invalid data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('orders'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orders retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)('orders/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getOrder", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('cart'),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map