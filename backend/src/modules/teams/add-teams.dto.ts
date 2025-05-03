import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';

export class AddTeamsDto {
  @ApiProperty({
    description: 'Array de IDs de equipos a agregar',
    example: ['65d4f5c8b32a9d001e8f71a3', '65d4f5c8b32a9d001e8f71a4'],
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  teamIds: string[];
}
