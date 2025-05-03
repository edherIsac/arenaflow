import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class TeamSeasonHistory {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Season', required: true, index: true })
  seasonId: Types.ObjectId;

  @Prop({ required: true })
  teamName: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true, index: true })
  categoryId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Group', default: null, index: true })
  groupId?: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Player', default: [], required: false })
  players: Types.ObjectId[];

  @Prop({
    type: [
      {
        playerId: { type: Types.ObjectId, ref: 'Player' },
        retiredAt: { type: Date },
        reason: { type: String, default: null },
      },
    ],
    default: [],
    required: false,
  })
  retiredPlayers: {
    playerId: Types.ObjectId;
    retiredAt: Date;
    reason?: string;
  }[];

  @Prop({ default: true })
  active: boolean;
}

const TeamSeasonHistorySchema = SchemaFactory.createForClass(TeamSeasonHistory);

// Crear índices compuestos para búsquedas comunes
TeamSeasonHistorySchema.index({ seasonId: 1, categoryId: 1 });
TeamSeasonHistorySchema.index({ seasonId: 1, active: 1 });

@Schema({
  timestamps: true,
  collection: 'teams',
  _id: true,
})
export class Team {
  @Prop({
    type: Types.ObjectId,
    ref: 'Franchise',
    required: true,
    unique: true,
    index: true,
  })
  franchiseId: Types.ObjectId;

  @Prop({ required: true })
  currentName: string;

  @Prop({
    type: [TeamSeasonHistorySchema],
    default: [],
    required: false,
  })
  seasonHistory: TeamSeasonHistory[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);

// Crear índice para búsquedas en el array de seasonHistory
TeamSchema.index({ 'seasonHistory.seasonId': 1 });
TeamSchema.index({ 'seasonHistory.categoryId': 1 });
TeamSchema.index({ 'seasonHistory.active': 1 });
