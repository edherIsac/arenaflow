import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from 'src/core/models/schemas/team.schema';
import { AddSeasonPlayersDto, CreateTeamDto } from './team.dto';

@Injectable()
export class TeamService {
  constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const createdTeam = new this.teamModel(createTeamDto);
    return createdTeam.save();
  }

  async findAll(): Promise<Team[]> {
    return this.teamModel.find().exec();
  }

  async findById(id: string): Promise<TeamDocument> {
    const team = await this.teamModel.findById(id).exec();
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async addPlayersToSeason(
    id: string,
    dto: AddSeasonPlayersDto,
  ): Promise<Team> {
    const team = await this.findById(id);
    const season = team.playersPerSeason.find((p) => p.season === dto.season);

    if (season) {
      season.players = dto.players;
    } else {
      team.playersPerSeason.push(dto);
    }

    return team.save();
  }
}
