import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Venue, VenueSchema } from 'src/core/models/schemas/venue.schema';
import { VenueController } from './venues.controller';
import { VenuesService } from './venues.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Venue.name, schema: VenueSchema }]),
  ],
  controllers: [VenueController],
  providers: [VenuesService],
  exports: [VenuesService],
})
export class VenuesModule {}
