import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async updateGroup(
    groupId: string,
    updateData: UpdateGroupDto,
  ): Promise<GroupDocument> {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Grupo no encontrado');

    // Actualiza solo los campos proporcionados
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        group[key] = updateData[key];
      }
    });

    return group.save();
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

  async addTeamsToGroup(
    groupId: string,
    teamIds: string[],
  ): Promise<GroupDocument> {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Grupo no encontrado');

    // Convertir a ObjectId y evitar duplicados
    const newTeams = teamIds
      .map((id) => new Types.ObjectId(id))
      .filter((id) => !group.teams.some((existingId) => existingId.equals(id)));

    group.teams.push(...newTeams);
    return group.save();
  }

  async removeTeamFromGroup(
    groupId: string,
    teamId: string,
  ): Promise<GroupDocument> {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Grupo no encontrado');

    // Convertir a ObjectId para comparación
    const teamObjectId = new Types.ObjectId(teamId);

    // Filtrar el equipo a eliminar
    group.teams = group.teams.filter(
      (existingId) => !existingId.equals(teamObjectId),
    );

    return group.save();
  }
}
