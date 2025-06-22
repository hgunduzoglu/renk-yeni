import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  findAll(@Query('category') categorySlug?: string) {
    return this.productService.findAll(categorySlug);
  }

  @Get(':identifier')
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('identifier') identifier: string) {
    const isNumeric = /^\d+$/.test(identifier);
    
    if (isNumeric) {
      return this.productService.findOne(parseInt(identifier));
    } else {
      return this.productService.findBySlug(identifier);
    }
  }
} 