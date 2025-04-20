import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VenueDocument = Venue & Document;

@Schema({ timestamps: true })
export class Venue {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  address: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
