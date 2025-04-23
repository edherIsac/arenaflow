import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class PenaltyFilter {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  playerId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  matchId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  teamId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  seasonId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  minDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  maxDate?: string;
}
