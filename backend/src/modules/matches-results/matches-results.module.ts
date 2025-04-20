import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MatchResult,
  MatchResultSchema,
} from 'src/core/models/schemas/match-result.schema';
import { MatchResultController } from './matches-results.controller';
import { MatchResultService } from './matches-results.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MatchResult.name, schema: MatchResultSchema },
    ]),
  ],
  controllers: [MatchResultController],
  providers: [MatchResultService],
  exports: [MatchResultService],
})
export class MatchesResultsModule {}
