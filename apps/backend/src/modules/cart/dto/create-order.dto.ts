import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Customer name' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ description: 'Customer surname' })
  @IsString()
  @IsNotEmpty()
  customerSurname: string;

  @ApiProperty({ description: 'Customer phone' })
  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @ApiProperty({ description: 'Customer email' })
  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @ApiProperty({ description: 'Delivery address' })
  @IsString()
  @IsNotEmpty()
  deliveryAddress: string;

  @ApiProperty({ description: 'Session ID for cart items' })
  @IsString()
  @IsNotEmpty()
  sessionId: string;
} 