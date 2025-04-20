import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
export class Group {
  @ApiProperty({
    description: 'Name of the group',
    example: 'Grupo A',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Reference to League',
    example: '507f1f77bcf86cd799439011',
  })
  @Prop({ type: Types.ObjectId, ref: 'League', required: true })
  league: Types.ObjectId;

  @ApiProperty({
    description: 'Reference to Season',
    example: '507f1f77bcf86cd799439012',
  })
  @Prop({ type: Types.ObjectId, ref: 'Season', required: true })
  season: Types.ObjectId;

  @ApiProperty({
    description: 'Reference to Category',
    example: '507f1f77bcf86cd799439013',
  })
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @ApiProperty({
    description: 'Array of team references',
    example: ['507f1f77bcf86cd799439014', '507f1f77bcf86cd799439015'],
    type: [String],
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Team' }], required: true })
  teams: Types.ObjectId[];

  @ApiProperty({
    description: 'Date for the group',
    example: '2023-12-31T00:00:00.000Z',
  })
  @Prop({ required: true })
  dateAt: Date;

  @ApiProperty({
    description: 'Whether the group is active',
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

export const GroupSchema = SchemaFactory.createForClass(Group);
