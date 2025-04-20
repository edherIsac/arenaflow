import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @ApiProperty({
    description: 'ID of the Liga',
    example: '507f1f77bcf86cd799439011',
  })
  @Prop({ required: true, type: Types.ObjectId, ref: 'Liga' })
  liga: string;

  @ApiProperty({
    description: 'Name of the category',
    example: 'Primera División',
  })
  @Prop({ required: true })
  nombre: string;

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

export const CategorySchema = SchemaFactory.createForClass(Category);
