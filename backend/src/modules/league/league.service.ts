import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { League, LeagueDocument } from 'src/core/models/schemas/league.schema';
import { UpdateLeagueDto } from './update-league.dto';
import { CreateLeagueDto } from './create-league.dto';

@Injectable()
export class LeagueService {
  constructor(
    @InjectModel(League.name) private leagueModel: Model<LeagueDocument>,
  ) {}

  async create(createLeagueDto: CreateLeagueDto): Promise<League> {
    const createdLeague = new this.leagueModel(createLeagueDto);
    return createdLeague.save();
  }

  async findAll(): Promise<League[]> {
    return this.leagueModel.find().exec();
  }

  async findOne(id: string): Promise<League> {
    return this.leagueModel.findById(id).exec();
  }

  async update(id: string, updateLeagueDto: UpdateLeagueDto): Promise<League> {
    return this.leagueModel
      .findByIdAndUpdate(id, updateLeagueDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<League> {
    return this.leagueModel.findByIdAndDelete(id).exec();
  }

  async findByActiveStatus(isActive: boolean): Promise<League[]> {
    return this.leagueModel.find({ isActive }).exec();
  }
}
