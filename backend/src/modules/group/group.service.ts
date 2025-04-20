import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from 'src/core/models/schemas/group.schema';
import { CreateGroupDto } from './create-group.dto';
import { UpdateGroupDto } from './update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const createdGroup = new this.groupModel(createGroupDto);
    return createdGroup.save();
  }

  async findAll(): Promise<Group[]> {
    return this.groupModel
      .find()
      .populate('league')
      .populate('season')
      .populate('category')
      .populate('teams')
      .exec();
  }

  async findOne(id: string): Promise<Group> {
    return this.groupModel
      .findById(id)
      .populate('league')
      .populate('season')
      .populate('category')
      .populate('teams')
      .exec();
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupModel
      .findByIdAndUpdate(id, updateGroupDto, { new: true })
      .populate('league')
      .populate('season')
      .populate('category')
      .populate('teams')
      .exec();
  }

  async remove(id: string): Promise<Group> {
    return this.groupModel.findByIdAndDelete(id).exec();
  }

  async findByLeague(leagueId: string): Promise<Group[]> {
    return this.groupModel
      .find({ league: leagueId })
      .populate('league')
      .populate('season')
      .populate('category')
      .populate('teams')
      .exec();
  }

  async findBySeason(seasonId: string): Promise<Group[]> {
    return this.groupModel
      .find({ season: seasonId })
      .populate('league')
      .populate('season')
      .populate('category')
      .populate('teams')
      .exec();
  }

  async findByCategory(categoryId: string): Promise<Group[]> {
    return this.groupModel
      .find({ category: categoryId })
      .populate('league')
      .populate('season')
      .populate('category')
      .populate('teams')
      .exec();
  }
}
