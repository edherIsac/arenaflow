import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVenueDto {
  @ApiProperty({ example: 'Estadio Municipal' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Calle Fútbol 123', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
