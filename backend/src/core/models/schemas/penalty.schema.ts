import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PenaltyDocument = Penalty & Document;

@Schema({ timestamps: true })
export class Penalty {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Player' })
  player: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Season' })
  season: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  group?: string;

  @Prop({
    required: true,
    enum: ['RED_CARD', 'YELLOW_CARDS_3', 'YELLOW_CARDS_5', 'OTHER'],
    default: 'OTHER',
  })
  type: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  durationDays: number;

  @Prop({ required: true })
  reason: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const PenaltySchema = SchemaFactory.createForClass(Penalty);
