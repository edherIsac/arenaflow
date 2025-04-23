import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSeasonDto {
  @ApiProperty({
    description: 'ID of the league this season belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsNotEmpty()
  @IsString()
  league: string;

  @ApiProperty({
    description: 'Optional name of the season',
    required: false,
    example: 'Summer 2023',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Start date of the season',
    example: '2023-06-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'End date of the season',
    example: '2023-08-31T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @ApiProperty({
    description: 'Creation date of the season record',
    example: '2023-05-15T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDate()
  dateAt: Date;

  @ApiProperty({
    description: 'Whether the season is active',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
