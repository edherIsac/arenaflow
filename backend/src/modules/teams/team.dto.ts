import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class TeamSeasonHistoryDto {
  _id: string;

  @ApiProperty({
    description: 'ID de temporada (ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  seasonId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  teamName: string;

  @ApiProperty({
    description: 'ID de categoría (ObjectId)',
    example: '507f1f77bcf86cd799439012',
  })
  @IsMongoId()
  categoryId: string;

  @ApiProperty({
    description: 'ID de grupo (ObjectId)',
    example: '507f1f77bcf86cd799439013',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  groupId?: string;

  @ApiProperty({
    type: [String],
    description: 'Array de IDs de jugadores (ObjectId)',
    example: ['507f1f77bcf86cd799439014'],
  })
  @IsArray()
  @IsMongoId({ each: true })
  players: string[];

  @ApiProperty({
    type: [Object],
    description: 'Array de jugadores retirados',
    default: [],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RetiredPlayerDto)
  retiredPlayers: RetiredPlayerDto[] = [];

  @ApiProperty({ default: true })
  @IsBoolean()
  active: boolean;
}

export class RetiredPlayerDto {
  @ApiProperty({
    description: 'ID del jugador retirado (ObjectId)',
    example: '507f1f77bcf86cd799439014',
  })
  @IsMongoId()
  playerId: string;

  @ApiProperty({
    description: 'Fecha de retiro',
  })
  @IsDate()
  retiredAt: Date;

  @ApiProperty({
    description: 'Razón del retiro',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;
}

export class CreateTeamDto {
  @ApiProperty({
    description: 'ID único de franquicia (ObjectId)',
    example: '507f1f77bcf86cd799439015',
  })
  @IsMongoId()
  franchiseId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currentName: string;

  @ApiProperty({
    type: [TeamSeasonHistoryDto],
    required: false,
    description: 'Historial de temporadas (opcional)',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamSeasonHistoryDto)
  seasonHistory?: TeamSeasonHistoryDto[];
}

export class AddSeasonPlayersDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  players: string[];
}

export class UpdateTeamPlayersDto {
  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsMongoId({ each: true })
  addPlayers?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsMongoId({ each: true })
  removePlayers?: string[];
}

export class UpdateTeamDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  currentName?: string;

  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  franchiseId?: string;
}

export class UpdateTeamSeasonDto {
  @ApiProperty({
    required: false,
    description: 'Nombre del equipo',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  teamName?: string;

  @ApiProperty({
    description: 'ID de categoría (ObjectId)',
    example: '507f1f77bcf86cd799439012',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    description: 'ID de grupo (ObjectId)',
    example: '507f1f77bcf86cd799439013',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  groupId?: string;

  @ApiProperty({
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export class RetirePlayerDto {
  @ApiProperty({
    description: 'ID único del historial de temporada (ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  seasonHistoryId: string;

  @ApiProperty({
    description: 'ID del jugador a retirar (ObjectId)',
    example: '507f1f77bcf86cd799439012',
  })
  @IsMongoId()
  playerId: string;

  @ApiProperty({
    description: 'Razón de la baja (opcional)',
    example: 'Lesión',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;
}
