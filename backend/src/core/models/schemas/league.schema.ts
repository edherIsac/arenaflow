import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LeagueDocument = League & Document;

@Schema({ timestamps: true })
export class League {
  @Prop({ required: true })
  name: string;

  @Prop({ default: true }) // Por defecto, los jugadores estarán activos
  isActive: boolean;
}

export const LeagueSchema = SchemaFactory.createForClass(League);
