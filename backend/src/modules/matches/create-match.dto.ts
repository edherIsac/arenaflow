import {
  IsNotEmpty,
  IsMongoId,
  IsDateString,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsOptional,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateAfter } from './is-date-after.validator';
import { JornadaDto } from './jornada.dto';

export class CreateMatchDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'ID del grupo',
  })
  @IsMongoId()
  @IsNotEmpty()
  group: string;

  @ApiProperty({
    type: [JornadaDto],
    description: 'Lista de jornadas (opcional)',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JornadaDto)
  jornadas?: JornadaDto[];

  @ApiProperty({
    example: '2025-06-01T00:00:00Z',
    description: 'Fecha de inicio en formato ISO',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    example: '2025-06-30T00:00:00Z',
    description: 'Fecha de fin en formato ISO',
  })
  @IsDateString()
  @IsNotEmpty()
  @Validate(IsDateAfter, ['startDate'])
  endDate: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  isActive?: boolean = true;
}
