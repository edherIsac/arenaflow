import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SeasonDocument = Season & Document;

@Schema({ timestamps: true })
export class Season {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Liga' })
  league: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: true }) // Por defecto, los jugadores estarán activos
  isActive: boolean;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
