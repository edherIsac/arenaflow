import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema({ timestamps: true })
export class Player {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  ineKey: string; // Clave INE

  @Prop({ required: true, unique: true })
  curp: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ default: true }) // Por defecto, los jugadores estarán activos
  isActive: boolean;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
