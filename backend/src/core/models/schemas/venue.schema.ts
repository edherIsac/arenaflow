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

  @Prop({
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
    },
  })
  location?: {
    type: string;
    coordinates: number[];
  };
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
