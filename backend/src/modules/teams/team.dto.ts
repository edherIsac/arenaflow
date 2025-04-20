import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PlayersPerSeasonDto {
  @ApiProperty({ example: '2024' })
  @IsString()
  @IsNotEmpty()
  season: string;

  @ApiProperty({ example: ['Player 1', 'Player 2'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  players: string[];
}

export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  franchiseKey: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ type: [PlayersPerSeasonDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlayersPerSeasonDto)
  playersPerSeason: PlayersPerSeasonDto[];
}

export class AddSeasonPlayersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  season: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  players: string[];
}
