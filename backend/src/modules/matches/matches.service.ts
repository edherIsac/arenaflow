import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument } from 'src/core/models/schemas/match.schema';
import { CreateMatchDto } from './create-match.dto';
import { UpdateMatchDto } from './update-match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const createdMatch = new this.matchModel(createMatchDto);
    return createdMatch.save();
  }

  async findAll(): Promise<Match[]> {
    return this.matchModel
      .find()
      .populate('group jornadas.teamA jornadas.teamB')
      .exec();
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchModel
      .findById(id)
      .populate('group jornadas.teamA jornadas.teamB')
      .exec();
    if (!match) {
      throw new NotFoundException('Match not found');
    }
    return match;
  }

  async update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match> {
    const updatedMatch = await this.matchModel
      .findByIdAndUpdate(id, updateMatchDto, { new: true })
      .exec();
    if (!updatedMatch) {
      throw new NotFoundException('Match not found');
    }
    return updatedMatch;
  }

  async remove(id: string): Promise<void> {
    const result = await this.matchModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Match not found');
    }
  }
}
