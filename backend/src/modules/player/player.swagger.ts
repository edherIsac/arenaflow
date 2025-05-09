import { ApiProperty } from '@nestjs/swagger';

export class Player {
  @ApiProperty({
    description: 'ID único del jugador',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre completo del jugador',
    example: 'Juan Pérez López',
  })
  fullName: string;

  @ApiProperty({
    description: 'Clave INE del jugador',
    example: 'ABCD1234567890',
  })
  ineKey: string;

  @ApiProperty({
    description: 'CURP del jugador',
    // example: 'PEMJ900115HDFRRN01',
  })
  curp: string;

  @ApiProperty({
    description: 'Fecha de nacimiento',
    example: '1990-01-15',
  })
  birthDate: Date;

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
    description: 'Nombre completo del jugador',
    required: false,
    example: 'Juan Pérez López',
  })
  fullName?: string;

  @ApiProperty({
    description: 'Clave INE del jugador',
    required: false,
    example: 'ABCD1234567890',
  })
  ineKey?: string;

  @ApiProperty({
    description: 'CURP del jugador',
    required: false,
    example: 'PEMJ900115HDFRRN01',
  })
  curp?: string;

  @ApiProperty({
    description: 'Fecha de nacimiento',
    required: false,
    example: '1990-01-15',
  })
  birthDate?: Date;

  @ApiProperty({
    description: 'Indica si el jugador está activo',
    required: false,
    example: true,
  })
  isActive?: boolean;
}
