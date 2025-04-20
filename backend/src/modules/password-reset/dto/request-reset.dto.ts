import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestResetDto {
  @ApiProperty({
    description: 'Email del usuario que solicita el reset de contraseña',
    example: 'usuario@ejemplo.com',
  })
  @IsEmail()
  email: string;
}
