import { ApiProperty } from '@nestjs/swagger';

export class Player {
  @ApiProperty({
    description: 'ID único del jugador',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({ description: 'Nombre del jugador', example: 'Juan' })
  firstName: string;

  @ApiProperty({ description: 'Apellido del jugador', example: 'Pérez' })
  lastName: string;

  @ApiProperty({ description: 'Fecha de nacimiento', example: '1990-01-15' })
  birthDate: Date;

  @ApiProperty({
    description: 'Clave INE del jugador',
    example: 'ABCD1234567890',
  })
  ineKey: string;

  @ApiProperty({
    description: 'CURP del jugador',
    example: 'PEMJ900115HDFRRN01',
  })
  curp: string;

  @ApiProperty({ description: 'Número de teléfono', example: '+521234567890' })
  phoneNumber: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'juan.perez@example.com',
  })
  email: string;

  @ApiProperty({ description: 'Posición preferida', example: 'Delantero' })
  position: string;

  @ApiProperty({ description: 'Número de camiseta', example: 10 })
  jerseyNumber: number;

  @ApiProperty({
    description: 'Indica si el jugador está activo',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class UpdatePlayerDto {
  @ApiProperty({
    description: 'Nombre del jugador',
    required: false,
    example: 'Juan',
  })
  firstName?: string;

  @ApiProperty({
    description: 'Apellido del jugador',
    required: false,
    example: 'Pérez',
  })
  lastName?: string;

  @ApiProperty({
    description: 'Fecha de nacimiento',
    required: false,
    example: '1990-01-15',
  })
  birthDate?: Date;

  @ApiProperty({
    description: 'Número de teléfono',
    required: false,
    example: '+521234567890',
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Correo electrónico',
    required: false,
    example: 'juan.perez@example.com',
  })
  email?: string;

  @ApiProperty({
    description: 'Posición preferida',
    required: false,
    example: 'Delantero',
  })
  position?: string;

  @ApiProperty({
    description: 'Número de camiseta',
    required: false,
    example: 10,
  })
  jerseyNumber?: number;
}
