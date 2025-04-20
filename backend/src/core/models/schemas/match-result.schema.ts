import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Event {
  @Prop({
    required: true,
    enum: ['goal', 'yellow_card', 'red_card', 'substitution'],
  })
  eventType: 'goal' | 'yellow_card' | 'red_card' | 'substitution';

  @Prop({ type: Types.ObjectId, ref: 'TeamMatch', required: true })
  team: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Player', required: true })
  player: Types.ObjectId;

  @Prop({ required: true })
  minute: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);

export type MatchResultDocument = MatchResult & Document;

@Schema()
export class TeamMatch {
  @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
  team: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Player' }], required: true })
  startingPlayers: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Player' }], default: [] })
  substitutes: Types.ObjectId[];
}

export const TeamMatchSchema = SchemaFactory.createForClass(TeamMatch);

@Schema({ timestamps: true })
export class MatchResult {
  @Prop({ required: true })
  matchDate: Date;

  @Prop({ required: true })
  referee: string; // Arbitro del partido

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
  season: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Group', required: true })
  group: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Match', required: true })
  match: Types.ObjectId;

  @Prop({ required: true })
  Matchday: number; // Jornada no.

  @Prop({ required: true })
  soccerField: string; // Cancha

  @Prop({ type: TeamMatchSchema })
  teamA: TeamMatch;

  @Prop({ required: true })
  goalsTeamA: number;

  @Prop({ type: TeamMatchSchema })
  teamB: TeamMatch;

  @Prop({ required: true })
  goalsTeamB: number;

  @Prop({ type: [EventSchema] })
  events: Event[];

  @Prop({ required: true })
  status: string; // En curso, terminado, suspendido, etc.
}

export const MatchResultSchema = SchemaFactory.createForClass(MatchResult);
