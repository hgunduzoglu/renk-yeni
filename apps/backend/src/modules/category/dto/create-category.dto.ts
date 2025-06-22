import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Pergole' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Pergole sistemleri için kategori' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '/uploads/categories/pergole.jpg' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  parentId?: number;
} 