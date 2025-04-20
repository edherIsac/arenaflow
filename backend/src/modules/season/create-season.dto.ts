import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateSeasonDto {
  @IsNotEmpty()
  @IsString()
  league: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsDate()
  inicio: Date;

  @IsNotEmpty()
  @IsDate()
  fin: Date;

  @IsNotEmpty()
  @IsDate()
  dateAt: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
