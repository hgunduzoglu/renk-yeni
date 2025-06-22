import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.album.findMany({
      include: {
        images: true,
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const album = await this.prisma.album.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
      },
    });

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    return album;
  }

  async findBySlug(slug: string) {
    const album = await this.prisma.album.findUnique({
      where: { slug },
      include: {
        images: true,
        category: true,
      },
    });

    if (!album) {
      throw new NotFoundException(`Album with slug ${slug} not found`);
    }

    return album;
  }
} 