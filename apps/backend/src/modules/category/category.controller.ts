import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiQuery({ name: 'parentId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  findAll(@Query('parentId') parentId?: string) {
    const parentIdNumber = parentId ? parseInt(parentId, 10) : undefined;
    return this.categoryService.findAll(parentIdNumber);
  }

  @Get(':identifier')
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('identifier') identifier: string) {
    // Check if identifier is numeric (ID) or string (slug)
    const isNumeric = /^\d+$/.test(identifier);
    
    if (isNumeric) {
      return this.categoryService.findOne(parseInt(identifier));
    } else {
      return this.categoryService.findBySlug(identifier);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/:id')
  @ApiOperation({ summary: 'Update category (Admin only)' })
  @ApiBearerAuth()
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/product/:productId/category/:categoryId')
  @ApiOperation({ summary: 'Move product to different category (Admin only)' })
  @ApiBearerAuth()
  async moveProductToCategory(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoryService.moveProductToCategory(+productId, +categoryId);
  }
} 