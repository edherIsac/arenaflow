import {
  IsNotEmpty,
  IsMongoId,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class JornadaDto {
  @ApiProperty({ type: String, required: false })
  @IsMongoId()
  @IsOptional()
  teamA?: string;

  @ApiProperty({ type: String, required: false })
  @IsMongoId()
  @IsOptional()
  teamB?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  numero: number;

  @ApiProperty({
    description: 'Indica si es una jornada de descanso',
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isBye?: boolean;
}

export class UpdateJornadaDto extends PartialType(JornadaDto) {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  numero?: number;
}
