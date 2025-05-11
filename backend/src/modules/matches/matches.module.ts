import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from 'src/core/models/schemas/match.schema';
import { MatchController } from './matches.controller';
import { MatchService } from './matches.service';
import { Group, GroupSchema } from 'src/core/models/schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Match.name, schema: MatchSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchesModule {}
