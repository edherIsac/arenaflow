import { IsString, IsNumber, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsNumber()
  team1Id: number;

  @IsNotEmpty()
  @IsNumber()
  team2Id: number;

  @IsNotEmpty()
  @IsNumber()
  tournamentId: number;

  @IsNotEmpty()
  @IsNumber()
  refereeId: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  team1Score: number;

  @IsNotEmpty()
  @IsNumber()
  team2Score: number;

  events: EventDto[];
}

export class EventDto {
  @IsNotEmpty()
  @IsString()
  type: 'goal' | 'card';

  @IsNotEmpty()
  @IsNumber()
  teamId: number;

  @IsNotEmpty()
  @IsString()
  playerName: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  cardType?: 'yellow' | 'red';
}

export class UpdateMatchDto {
  @IsOptional()
  @IsNumber()
  team1Id?: number;

  @IsOptional()
  @IsNumber()
  team2Id?: number;

  @IsOptional()
  @IsNumber()
  tournamentId?: number;

  @IsOptional()
  @IsNumber()
  refereeId?: number;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  team1Score?: number;

  @IsOptional()
  @IsNumber()
  team2Score?: number;

  events?: EventDto[];
}
