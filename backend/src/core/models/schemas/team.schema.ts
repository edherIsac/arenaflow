import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class PlayersPerSeason {
  @Prop({ required: true })
  season: string;

  @Prop({ required: true, type: [String] })
  players: string[];
}

const PlayersPerSeasonSchema = SchemaFactory.createForClass(PlayersPerSeason);

@Schema({ timestamps: true })
export class Team {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  franchiseKey: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [PlayersPerSeasonSchema], default: [] })
  playersPerSeason: PlayersPerSeason[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
