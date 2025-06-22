import { IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ description: 'Product ID' })
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Quantity', default: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  quantity?: number = 1;

  @ApiProperty({ description: 'Session ID for guest users' })
  @IsString()
  sessionId: string;
} 