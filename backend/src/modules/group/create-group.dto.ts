import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Name of the group',
    example: 'Grupo A',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID of the league',
    example: '507f1f77bcf86cd799439011',
  })
  @IsNotEmpty()
  @IsString()
  league: string;

  @ApiProperty({
    description: 'ID of the season',
    example: '507f1f77bcf86cd799439012',
  })
  @IsNotEmpty()
  @IsString()
  season: string;

  @ApiProperty({
    description: 'ID of the category',
    example: '507f1f77bcf86cd799439013',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Array of team IDs',
    example: ['507f1f77bcf86cd799439014', '507f1f77bcf86cd799439015'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  @IsOptional()
  teams: string[];

  @ApiProperty({
    description: 'Whether the group is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
