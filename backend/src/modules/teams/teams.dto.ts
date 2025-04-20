import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  tournamentId: number;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsOptional()
  @IsNumber()
  matchesPlayed?: number;

  @IsOptional()
  @IsNumber()
  wins?: number;

  @IsOptional()
  @IsNumber()
  draws?: number;

  @IsOptional()
  @IsNumber()
  losses?: number;

  @IsOptional()
  @IsNumber()
  goalsFor?: number;

  @IsOptional()
  @IsNumber()
  goalsAgainst?: number;

  @IsOptional()
  @IsNumber()
  goalDifference?: number;
}

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsNumber()
  tournamentId?: number;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsOptional()
  @IsNumber()
  matchesPlayed?: number;

  @IsOptional()
  @IsNumber()
  wins?: number;

  @IsOptional()
  @IsNumber()
  draws?: number;

  @IsOptional()
  @IsNumber()
  losses?: number;

  @IsOptional()
  @IsNumber()
  goalsFor?: number;

  @IsOptional()
  @IsNumber()
  goalsAgainst?: number;

  @IsOptional()
  @IsNumber()
  goalDifference?: number;
}
