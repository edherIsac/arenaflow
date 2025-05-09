import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Penalty } from '../../core/models/schemas/penalty.schema';
import { CreatePenaltyDto } from './create-penalty.dto';
import { UpdatePenaltyDto } from './update-penalty.dto';
import { PenaltyFilter } from './penalty-filter.dto';

@Injectable()
export class PenaltyService {
  constructor(
    @InjectModel(Penalty.name) private penaltyModel: Model<Penalty>,
  ) {}

  async create(createPenaltyDto: CreatePenaltyDto): Promise<Penalty> {
    const createdPenalty = new this.penaltyModel(createPenaltyDto);
    return createdPenalty.save();
  }

  async findAll(filter: PenaltyFilter): Promise<Penalty[]> {
    const query: any = {};

    if (filter.playerId) query.player = filter.playerId;
    if (filter.seasonId) query.season = filter.seasonId;
    if (filter.minDate || filter.maxDate) {
      query.startDate = {};
      if (filter.minDate) query.startDate.$gte = new Date(filter.minDate);
      if (filter.maxDate) query.startDate.$lte = new Date(filter.maxDate);
    }

    return this.penaltyModel.find(query).exec();
  }

  async findOne(id: string): Promise<Penalty> {
    return this.penaltyModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePenaltyDto: UpdatePenaltyDto,
  ): Promise<Penalty> {
    return this.penaltyModel
      .findByIdAndUpdate(id, updatePenaltyDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.penaltyModel.findByIdAndDelete(id).exec();
  }
}
