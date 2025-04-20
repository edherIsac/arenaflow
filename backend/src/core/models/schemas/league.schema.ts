import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LeagueDocument = League & Document;

@Schema()
export class League {
  @Prop()
  name: string;

  @Prop({ required: true })
  dateAt: Date;

  @Prop({ default: true }) // Por defecto, los jugadores estarán activos
  isActive: boolean;
}

export const LeagueSchema = SchemaFactory.createForClass(League);
