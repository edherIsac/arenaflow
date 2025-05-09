import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsBoolean, IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreatePlayerDto } from './create.player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @ApiProperty({
    description: 'Nombre completo del jugador',
    example: 'Juan Pérez López',
    required: false,
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    description: 'Clave INE (identificación única)',
    example: 'ABC123456XYZ',
    required: false,
  })
  @IsString()
  @IsOptional()
  ineKey?: string;

  @ApiProperty({
    description: 'CURP (Clave Única de Registro de Población)',
    example: 'PELJ800101HDFRZN01',
    required: false,
  })
  @IsString()
  @IsOptional()
  curp?: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del jugador',
    example: '1990-01-01',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    description: 'Indica si el jugador está activo',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
