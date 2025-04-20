import { IsNotEmpty, IsEmail, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'User full name' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'juanperez@example.com',
    description: 'User email (must be unique)',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'juanperez',
    description: 'Username (must be unique)',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'delegado',
    description: 'User role',
    enum: [
      'presidente',
      'vicepresidente',
      'Secretario',
      'vocal',
      'asistente',
      'delegado',
      'arbitro',
    ],
  })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({
    example: true,
    description: 'Whether user is active',
    required: false,
    default: true,
  })
  @IsBoolean()
  isActive: boolean = true;
}
