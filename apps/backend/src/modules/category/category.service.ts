import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = this.generateSlug(createCategoryDto.name);
    
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        slug,
      },
      include: {
        parent: true,
        children: true,
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async findAll(parentId?: number) {
    const where = parentId ? { parentId } : { parentId: null };
    
    return this.prisma.category.findMany({
      where,
      include: {
        parent: true,
        children: true,
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        products: {
          include: {
            images: true,
          },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        parent: true,
        children: true,
        products: {
          include: {
            images: true,
          },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with slug ${slug} not found`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    
    const data: any = { ...updateCategoryDto };
    if (updateCategoryDto.name) {
      data.slug = this.generateSlug(updateCategoryDto.name);
    }

    return this.prisma.category.update({
      where: { id },
      data,
      include: {
        parent: true,
        children: true,
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    
    return this.prisma.category.delete({
      where: { id },
    });
  }

  async moveProductToCategory(productId: number, categoryId: number) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Check if category exists
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Update product's category
    return this.prisma.product.update({
      where: { id: productId },
      data: { categoryId },
      include: {
        category: true,
        images: true,
      },
    });
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
} 