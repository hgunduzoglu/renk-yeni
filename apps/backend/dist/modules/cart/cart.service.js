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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addToCart(addToCartDto) {
        const { productId, quantity = 1, sessionId } = addToCartDto;
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        const existingCartItem = await this.prisma.cartItem.findUnique({
            where: {
                session_product: {
                    sessionId,
                    productId,
                },
            },
        });
        if (existingCartItem) {
            return this.prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + quantity },
                include: {
                    product: {
                        include: {
                            category: true,
                        },
                    },
                },
            });
        }
        return this.prisma.cartItem.create({
            data: {
                sessionId,
                productId,
                quantity,
            },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
    }
    async getCart(sessionId) {
        const cartItems = await this.prisma.cartItem.findMany({
            where: { sessionId },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        const totalAmount = cartItems.reduce((total, item) => {
            return total + (Number(item.product.price) * item.quantity);
        }, 0);
        return {
            items: cartItems,
            totalAmount,
            itemCount: cartItems.length,
        };
    }
    async updateCartItem(sessionId, productId, quantity) {
        if (quantity <= 0) {
            throw new common_1.BadRequestException('Quantity must be greater than 0');
        }
        const cartItem = await this.prisma.cartItem.findUnique({
            where: {
                session_product: {
                    sessionId,
                    productId,
                },
            },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        return this.prisma.cartItem.update({
            where: { id: cartItem.id },
            data: { quantity },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
    }
    async removeFromCart(sessionId, productId) {
        const cartItem = await this.prisma.cartItem.findUnique({
            where: {
                session_product: {
                    sessionId,
                    productId,
                },
            },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        await this.prisma.cartItem.delete({
            where: { id: cartItem.id },
        });
        return { message: 'Item removed from cart' };
    }
    async clearCart(sessionId) {
        await this.prisma.cartItem.deleteMany({
            where: { sessionId },
        });
        return { message: 'Cart cleared' };
    }
    async createOrder(createOrderDto) {
        const { sessionId, ...customerData } = createOrderDto;
        const cartItems = await this.prisma.cartItem.findMany({
            where: { sessionId },
            include: {
                product: true,
            },
        });
        if (cartItems.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        const totalAmount = cartItems.reduce((total, item) => {
            return total + (Number(item.product.price) * item.quantity);
        }, 0);
        const orderNumber = `RNK-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        const order = await this.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    orderNumber,
                    ...customerData,
                    totalAmount,
                },
            });
            for (const cartItem of cartItems) {
                await tx.orderItem.create({
                    data: {
                        orderId: newOrder.id,
                        productId: cartItem.productId,
                        productName: cartItem.product.name,
                        quantity: cartItem.quantity,
                        unitPrice: cartItem.product.price,
                        totalPrice: Number(cartItem.product.price) * cartItem.quantity,
                    },
                });
            }
            await tx.cartItem.deleteMany({
                where: { sessionId },
            });
            return newOrder;
        });
        return this.prisma.order.findUnique({
            where: { id: order.id },
            include: {
                items: true,
            },
        });
    }
    async getOrders() {
        return this.prisma.order.findMany({
            include: {
                items: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getOrder(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map