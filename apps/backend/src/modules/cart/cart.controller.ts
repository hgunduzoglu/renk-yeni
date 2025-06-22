import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiResponse({ status: 201, description: 'Item added to cart successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Get()
  @ApiQuery({ name: 'sessionId', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  getCart(@Query('sessionId') sessionId: string) {
    return this.cartService.getCart(sessionId);
  }

  @Put('update/:productId')
  @ApiQuery({ name: 'sessionId', required: true, type: String })
  @ApiQuery({ name: 'quantity', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  updateCartItem(
    @Param('productId', ParseIntPipe) productId: number,
    @Query('sessionId') sessionId: string,
    @Query('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.cartService.updateCartItem(sessionId, productId, quantity);
  }

  @Delete('remove/:productId')
  @ApiQuery({ name: 'sessionId', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Item removed from cart successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  removeFromCart(
    @Param('productId', ParseIntPipe) productId: number,
    @Query('sessionId') sessionId: string,
  ) {
    return this.cartService.removeFromCart(sessionId, productId);
  }

  @Delete('clear')
  @ApiQuery({ name: 'sessionId', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully' })
  clearCart(@Query('sessionId') sessionId: string) {
    return this.cartService.clearCart(sessionId);
  }

  @Post('checkout')
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Cart is empty or invalid data' })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.cartService.createOrder(createOrderDto);
  }

  @Get('orders')
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  getOrders() {
    return this.cartService.getOrders();
  }

  @Get('orders/:id')
  @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.getOrder(id);
  }
} 