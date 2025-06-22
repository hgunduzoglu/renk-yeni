import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(addToCartDto: AddToCartDto): Promise<{
        product: {
            category: {
                description: string | null;
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                coverImage: string | null;
                parentId: number | null;
                slug: string;
            };
        } & {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            slug: string;
            price: import("@prisma/client/runtime/library").Decimal;
            categoryId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        quantity: number;
        sessionId: string;
    }>;
    getCart(sessionId: string): Promise<{
        items: ({
            product: {
                category: {
                    description: string | null;
                    id: number;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    coverImage: string | null;
                    parentId: number | null;
                    slug: string;
                };
            } & {
                description: string | null;
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                coverImage: string | null;
                slug: string;
                price: import("@prisma/client/runtime/library").Decimal;
                categoryId: number;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            productId: number;
            quantity: number;
            sessionId: string;
        })[];
        totalAmount: number;
        itemCount: number;
    }>;
    updateCartItem(productId: number, sessionId: string, quantity: number): Promise<{
        product: {
            category: {
                description: string | null;
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                coverImage: string | null;
                parentId: number | null;
                slug: string;
            };
        } & {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            slug: string;
            price: import("@prisma/client/runtime/library").Decimal;
            categoryId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        quantity: number;
        sessionId: string;
    }>;
    removeFromCart(productId: number, sessionId: string): Promise<{
        message: string;
    }>;
    clearCart(sessionId: string): Promise<{
        message: string;
    }>;
    createOrder(createOrderDto: CreateOrderDto): Promise<{
        items: {
            id: number;
            createdAt: Date;
            productId: number;
            quantity: number;
            orderId: number;
            productName: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerSurname: string;
        customerPhone: string;
        customerEmail: string;
        deliveryAddress: string;
        orderNumber: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        status: string;
    }>;
    getOrders(): Promise<({
        items: {
            id: number;
            createdAt: Date;
            productId: number;
            quantity: number;
            orderId: number;
            productName: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerSurname: string;
        customerPhone: string;
        customerEmail: string;
        deliveryAddress: string;
        orderNumber: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        status: string;
    })[]>;
    getOrder(id: number): Promise<{
        items: {
            id: number;
            createdAt: Date;
            productId: number;
            quantity: number;
            orderId: number;
            productName: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerSurname: string;
        customerPhone: string;
        customerEmail: string;
        deliveryAddress: string;
        orderNumber: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        status: string;
    }>;
}
