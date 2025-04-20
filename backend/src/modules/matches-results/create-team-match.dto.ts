import { IsMongoId, IsArray } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamMatchDto {
  @ApiProperty({
    description: 'ID del equipo',
    example: '60a7c1234f1a2b3c4d5e6789',
  })
  @IsMongoId()
  team: Types.ObjectId;

  @ApiProperty({
    description: 'Lista de jugadores iniciales',
    type: [String],
    example: ['60a7c1234f1a2b3c4d5e6789', '60a7c1234f1a2b3c4d5e6789'],
  })
  @IsArray()
  @IsMongoId({ each: true })
  startingPlayers: Types.ObjectId[];

  @ApiProperty({
    description: 'Lista de jugadores sustitutos',
    type: [String],
    example: ['60a7c1234f1a2b3c4d5e6789'],
  })
  @IsArray()
  @IsMongoId({ each: true })
  substitutes: Types.ObjectId[];
}
