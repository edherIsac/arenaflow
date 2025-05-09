import { Module } from '@nestjs/common';
import { PenaltyController } from './penalty.controller';
import { PenaltyService } from './penalty.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Penalty,
  PenaltySchema,
} from '../../core/models/schemas/penalty.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Penalty.name,
        schema: PenaltySchema,
      },
    ]),
  ],
  controllers: [PenaltyController],
  providers: [PenaltyService],
})
export class PenaltyModule {}
