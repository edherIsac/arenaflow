import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsBoolean,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({
    description: 'Nombre completo del jugador',
    example: 'Juan Pérez López',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Clave INE (identificación única)',
    example: 'ABC123456XYZ',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  ineKey: string;

  @ApiProperty({
    description: 'CURP (Clave Única de Registro de Población)',
    example: 'PELJ800101HDFRZN01',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  curp: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del jugador',
    example: '1990-01-01',
  })
  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({
    description: 'Fecha de registro',
    example: '2023-01-01',
    default: new Date().toISOString().split('T')[0],
  })
  @IsDateString()
  @IsOptional()
  dateAt?: Date;

  @ApiProperty({
    description: 'Indica si el jugador está activo',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
