import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Un registro por gupo, categoria, tempora y liga
// Contendra todos los enfrentamientos segun los equipos asignados al grupo

@Schema()
export class Jornada {
  @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
  teamA: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
  teamB: Types.ObjectId;

  @Prop({ required: true })
  numero: number;
}

export const JornadaSchema = SchemaFactory.createForClass(Jornada);

export type MatchDocument = Match & Document;

@Schema({ timestamps: true })
export class Match {
  @Prop({ type: Types.ObjectId, ref: 'SeaGroupson', required: true })
  group: Types.ObjectId;

  @Prop({ type: [JornadaSchema] })
  jornadas: Jornada[];

  @Prop({ required: true })
  startDate: Date; // Fecha de inicio de los enfrentamientos

  @Prop({ required: true })
  endDate: Date; // Fecha de finalización del grupo

  @Prop({ default: true })
  isActive: boolean;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
