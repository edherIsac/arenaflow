import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Penalty } from '../../core/models/schemas/penalty.schema';

export class UpdatePenaltyDto implements Partial<Penalty> {
  @ApiProperty({
    description: 'ID del jugador',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  player?: string;

  @ApiProperty({
    description: 'ID de la temporada',
    example: '507f1f77bcf86cd799439012',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  season?: string;

  @ApiProperty({
    description: 'Tipo de castigo',
    enum: ['RED_CARD', 'YELLOW_CARDS_3', 'YELLOW_CARDS_5', 'OTHER'],
    example: 'RED_CARD',
    required: false,
  })
  @IsOptional()
  type?: string;

  @ApiProperty({
    description: 'Fecha de inicio del castigo',
    example: '2025-01-01',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: 'Duración en días del castigo',
    example: 3,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  durationDays?: number;

  @ApiProperty({
    description: 'Razón del castigo',
    example: 'Tarjeta roja por falta grave',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiProperty({
    description: 'Categoría para filtrar',
    example: 'LIGA_PRINCIPAL',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'Grupo para filtrar',
    example: 'GRUPO_A',
    required: false,
  })
  @IsString()
  @IsOptional()
  group?: string;

  @ApiProperty({
    description: 'Estado del castigo',
    example: true,
    required: false,
  })
  @IsOptional()
  isActive?: boolean;
}
