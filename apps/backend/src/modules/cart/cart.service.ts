import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(addToCartDto: AddToCartDto) {
    const { productId, quantity = 1, sessionId } = addToCartDto;

    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Check if item already exists in cart
    const existingCartItem = await this.prisma.cartItem.findUnique({
      where: {
        session_product: {
          sessionId,
          productId,
        },
      },
    });

    if (existingCartItem) {
      // Update quantity
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

    // Create new cart item
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

  async getCart(sessionId: string) {
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

  async updateCartItem(sessionId: string, productId: number, quantity: number) {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
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
      throw new NotFoundException('Cart item not found');
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

  async removeFromCart(sessionId: string, productId: number) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        session_product: {
          sessionId,
          productId,
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.delete({
      where: { id: cartItem.id },
    });

    return { message: 'Item removed from cart' };
  }

  async clearCart(sessionId: string) {
    await this.prisma.cartItem.deleteMany({
      where: { sessionId },
    });

    return { message: 'Cart cleared' };
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const { sessionId, ...customerData } = createOrderDto;

    // Get cart items
    const cartItems = await this.prisma.cartItem.findMany({
      where: { sessionId },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((total, item) => {
      return total + (Number(item.product.price) * item.quantity);
    }, 0);

    // Generate order number
    const orderNumber = `RNK-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create order with transaction
    const order = await this.prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          ...customerData,
          totalAmount,
        },
      });

      // Create order items
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

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { sessionId },
      });

      return newOrder;
    });

    // Return order with items
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

  async getOrder(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }
}