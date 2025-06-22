import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { GalleryService } from './gallery.service';

@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Albums retrieved successfully' })
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(':identifier')
  @ApiResponse({ status: 200, description: 'Album retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  async findOne(@Param('identifier') identifier: string) {
    const isNumeric = /^\d+$/.test(identifier);
    
    if (isNumeric) {
      return this.galleryService.findOne(parseInt(identifier));
    } else {
      return this.galleryService.findBySlug(identifier);
    }
  }
} 