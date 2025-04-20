import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'ID of the Liga this category belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsNotEmpty()
  @IsString()
  liga: string;

  @ApiProperty({
    description: 'Name of the category',
    example: 'Primera División',
  })
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
