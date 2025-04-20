import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SeasonDocument = Season & Document;

@Schema()
export class Season {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Liga' })
  league: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  inicio: Date;

  @Prop({ required: true })
  fin: Date;

  @Prop({ required: true })
  dateAt: Date;

  @Prop({ default: true }) // Por defecto, los jugadores estarán activos
  isActive: boolean;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
