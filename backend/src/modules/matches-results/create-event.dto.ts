import { IsNotEmpty, IsEnum, IsNumber, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'Tipo de evento',
    enum: ['goal', 'yellow_card', 'red_card', 'substitution'],
    example: 'goal',
  })
  @IsEnum(['goal', 'yellow_card', 'red_card', 'substitution'])
  eventType: 'goal' | 'yellow_card' | 'red_card' | 'substitution';

  @ApiProperty({
    description: 'ID del equipo',
    example: '60a7c1234f1a2b3c4d5e6789',
  })
  @IsMongoId()
  @IsNotEmpty()
  team: Types.ObjectId;

  @ApiProperty({
    description: 'ID del jugador',
    example: '60a7c1234f1a2b3c4d5e6789',
  })
  @IsMongoId()
  @IsNotEmpty()
  player: Types.ObjectId;

  @ApiProperty({ description: 'Minuto del evento', example: 45 })
  @IsNumber()
  @IsNotEmpty()
  minute: number;
}
