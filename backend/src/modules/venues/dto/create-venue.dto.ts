import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @ApiProperty({
    example: {
      type: 'Point',
      coordinates: [-99.1506, 19.3029],
    },
    required: false,
    description: 'Geolocalización en formato GeoJSON Point',
  })
  @IsOptional()
  @IsArray()
  location?: {
    type: string;
    coordinates: number[];
  };
}
