import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(categorySlug?: string) {
    const where: any = {};
    
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    return this.prisma.product.findMany({
      where,
      include: {
        category: true,
        images: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    return product;
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