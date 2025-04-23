import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Penalty } from '../../core/models/schemas/penalty.schema';

export class CreatePenaltyDto implements Partial<Penalty> {
  @ApiProperty({
    description: 'ID del jugador',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  player: string;

  @ApiProperty({
    description: 'ID de la temporada',
    example: '507f1f77bcf86cd799439012',
  })
  @IsMongoId()
  @IsNotEmpty()
  season: string;

  @ApiProperty({
    description: 'Tipo de castigo',
    enum: ['RED_CARD', 'YELLOW_CARDS_3', 'YELLOW_CARDS_5', 'OTHER'],
    example: 'RED_CARD',
  })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Fecha de inicio del castigo',
    example: '2025-01-01',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ description: 'Duración en días del castigo', example: 3 })
  @IsNumber()
  @IsNotEmpty()
  durationDays: number;

  @ApiProperty({
    description: 'Razón del castigo',
    example: 'Tarjeta roja por falta grave',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({
    description: 'Categoría para filtrar',
    example: 'LIGA_PRINCIPAL',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Grupo para filtrar',
    example: 'GRUPO_A',
    required: false,
  })
  @IsString()
  @IsOptional()
  group?: string;
}
