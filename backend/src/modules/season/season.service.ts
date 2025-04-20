import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Season, SeasonDocument } from 'src/core/models/schemas/season.schema';
import { CreateSeasonDto } from './create-season.dto';
import { UpdateSeasonDto } from './update-season.dto';

@Injectable()
export class SeasonService {
  constructor(
    @InjectModel(Season.name) private seasonModel: Model<SeasonDocument>,
  ) {}

  async create(createSeasonDto: CreateSeasonDto): Promise<Season> {
    const createdSeason = new this.seasonModel(createSeasonDto);
    return createdSeason.save();
  }

  async findAll(): Promise<Season[]> {
    return this.seasonModel.find().exec();
  }

  async findOne(id: string): Promise<Season> {
    return this.seasonModel.findById(id).exec();
  }

  async update(id: string, updateSeasonDto: UpdateSeasonDto): Promise<Season> {
    return this.seasonModel
      .findByIdAndUpdate(id, updateSeasonDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Season> {
    return this.seasonModel.findByIdAndDelete(id).exec();
  }

  async findByLeague(leagueId: string): Promise<Season[]> {
    return this.seasonModel.find({ league: leagueId }).exec();
  }

  async getActiveSeasons(): Promise<Season[]> {
    return this.seasonModel.find({ isActive: true }).exec();
  }
}
