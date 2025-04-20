import {
  IsDate,
  IsNotEmpty,
  IsMongoId,
  IsNumber,
  IsString,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreateTeamMatchDto } from './create-team-match.dto';
import { CreateEventDto } from './create-event.dto';

export class CreateMatchResultDto {
  @ApiProperty({
    description: 'Fecha del partido',
    example: '2024-05-01T00:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  matchDate: Date;

  @ApiProperty({ description: 'Nombre del árbitro', example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  referee: string;

  @ApiProperty({
    description: 'ID de la categoría',
    example: '60a7c1234f1a2b3c4d5e6789',
  })
  @IsMongoId()
  @IsNotEmpty()
  category: Types.ObjectId;

  @ApiProperty({
    description: 'ID de la temporada',
    example: '60a7c1234f1a2b3c4d5e6789',
  })
  @IsMongoId()
  @IsNotEmpty()
  season: Types.ObjectId;

  @ApiProperty({
    description: 'ID del grupo',
    example: '60a7c1234f1a2b3c4d5e6789',
  })
  @IsMongoId()
  @IsNotEmpty()
  group: Types.ObjectId;

  @ApiProperty({
    description: 'ID del match',
    example: '60a7c1234f1a2b3c4d5e6789',
  })
  @IsMongoId()
  @IsNotEmpty()
  match: Types.ObjectId;

  @ApiProperty({ description: 'Número de jornada', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  Matchday: number;

  @ApiProperty({
    description: 'Nombre de la cancha',
    example: 'Estadio Nacional',
  })
  @IsString()
  @IsNotEmpty()
  soccerField: string;

  @ApiProperty({
    description: 'Información del equipo A',
    type: CreateTeamMatchDto,
  })
  @IsArray()
  teamA: CreateTeamMatchDto[];

  @ApiProperty({ description: 'Goles del equipo A', example: 3 })
  @IsNumber()
  @IsNotEmpty()
  goalsTeamA: number;

  @ApiProperty({
    description: 'Información del equipo B',
    type: CreateTeamMatchDto,
  })
  @IsArray()
  teamB: CreateTeamMatchDto[];

  @ApiProperty({ description: 'Goles del equipo B', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  goalsTeamB: number;

  @ApiProperty({
    description: 'Eventos ocurridos en el partido',
    type: [CreateEventDto],
  })
  @IsArray()
  events: CreateEventDto[];

  @ApiProperty({ description: 'Estado del partido', example: 'terminado' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
