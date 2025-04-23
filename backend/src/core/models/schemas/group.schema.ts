import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
export class Group {
  @Prop({ required: true })
  name: string; // Grupo A, Grupo B, Grupo C, Grupo D

  @Prop({ type: Types.ObjectId, ref: 'League', required: true })
  league: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Season', required: true })
  season: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Team' }], required: true })
  teams: Types.ObjectId[];

  @Prop({ default: true }) // Por defecto, los equipos estarán activos
  isActive: boolean;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
