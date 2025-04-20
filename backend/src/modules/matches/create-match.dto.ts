import {
  IsDate,
  IsNotEmpty,
  IsBoolean,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Jornada } from 'src/core/models/schemas/match.schema';

export class CreateMatchDto {
  @ApiProperty({
    description: 'ID del grupo',
    example: '60a7c1234f1a2b3c4d5e6789',
  })
  @IsNotEmpty()
  group: Types.ObjectId;

  @ApiProperty({ description: 'Lista de jornadas', type: [Jornada] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Jornada)
  jornadas: Jornada[];

  @ApiProperty({
    description: 'Fecha de inicio',
    example: '2024-05-01T00:00:00.000Z',
  })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'Fecha de finalización',
    example: '2024-06-01T00:00:00.000Z',
  })
  @IsDate()
  endDate: Date;

  @ApiProperty({
    description: 'Estado del match',
    example: true,
    required: false,
  })
  @IsBoolean()
  isActive?: boolean;
}
