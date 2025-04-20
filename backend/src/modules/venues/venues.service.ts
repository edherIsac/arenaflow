import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVenueDto } from './dto/create-venue.dto';
import { Venue, VenueDocument } from 'src/core/models/schemas/venue.schema';
import { UpdateVenueDto } from './dto/update-venue.dto';

@Injectable()
export class VenuesService {
  constructor(
    @InjectModel(Venue.name) private venueModel: Model<VenueDocument>,
  ) {}

  async create(createVenueDto: CreateVenueDto): Promise<Venue> {
    const venue = new this.venueModel(createVenueDto);
    return venue.save();
  }

  async findAll(): Promise<Venue[]> {
    return this.venueModel.find().exec();
  }

  async findOne(id: string): Promise<Venue> {
    const venue = await this.venueModel.findById(id).exec();
    if (!venue) throw new NotFoundException('Venue not found');
    return venue;
  }

  async update(id: string, updateVenueDto: UpdateVenueDto): Promise<Venue> {
    const updated = await this.venueModel
      .findByIdAndUpdate(id, updateVenueDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Venue not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.venueModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Venue not found');
  }
}
