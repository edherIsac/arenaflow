import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, type: Types.ObjectId, ref: 'League' })
  liga: string;

  @Prop({ required: true })
  nombre: string; // Ejemplo: "Primera División", "Sub-20"
}

export const CategorySchema = SchemaFactory.createForClass(Category);
