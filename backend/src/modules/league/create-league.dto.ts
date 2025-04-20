import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateLeagueDto {
  @ApiProperty({
    description: 'Name of the league',
    example: 'Liga Profesional',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Date for the league',
    example: '2023-12-31',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  dateAt: Date;

  @ApiProperty({
    description: 'Whether the league is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
