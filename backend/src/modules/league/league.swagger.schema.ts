import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LeagueDocument = League & Document;

@Schema({ timestamps: true })
export class League {
  @ApiProperty({
    description: 'Name of the league',
    example: 'Liga Profesional',
  })
  @Prop()
  name: string;

  @ApiProperty({
    description: 'Date for the league',
    example: '2023-12-31T00:00:00.000Z',
  })
  @Prop({ required: true })
  dateAt: Date;

  @ApiProperty({
    description: 'Whether the league is active',
    example: true,
  })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Creation date',
    example: '2023-05-14T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2023-05-14T12:00:00.000Z',
  })
  updatedAt: Date;
}

export const LeagueSchema = SchemaFactory.createForClass(League);
