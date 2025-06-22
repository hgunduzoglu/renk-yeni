import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.news.findMany({
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    return news;
  }

  async findBySlug(slug: string) {
    const news = await this.prisma.news.findUnique({
      where: { slug },
    });

    if (!news) {
      throw new NotFoundException(`News with slug ${slug} not found`);
    }

    return news;
  }

  private generateSlug(title: string): string {
    return title
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