import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { NewsService } from './news.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'News retrieved successfully' })
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':identifier')
  @ApiResponse({ status: 200, description: 'News retrieved successfully' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async findOne(@Param('identifier') identifier: string) {
    const isNumeric = /^\d+$/.test(identifier);
    
    if (isNumeric) {
      return this.newsService.findOne(parseInt(identifier));
    } else {
      return this.newsService.findBySlug(identifier);
    }
  }
} 