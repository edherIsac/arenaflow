import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Team,
  TeamDocument,
  TeamSeasonHistory,
} from 'src/core/models/schemas/team.schema';
import {
  AddSeasonPlayersDto,
  CreateTeamDto,
  UpdateTeamDto,
  UpdateTeamPlayersDto,
  UpdateTeamSeasonDto,
} from './team.dto';

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

  async findById(teamId: string): Promise<TeamDocument> {
    const team = await this.teamModel.findById(teamId).exec();
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async updateTeamPlayers(
    teamId: string,
    seasonId: string,
    dto: UpdateTeamPlayersDto,
  ): Promise<Team> {
    const team = await this.findById(teamId);

    // Encontrar el historial de la temporada
    const seasonHistory = team.seasonHistory.find(
      (history) => history.seasonId.toString() === seasonId,
    );

    if (!seasonHistory) {
      throw new NotFoundException(
        `Season ${seasonId} not found in team history`,
      );
    }

    // Convertir IDs de string a ObjectId
    const playersToAdd =
      dto.addPlayers?.map((id) => new Types.ObjectId(id)) || [];
    const playersToRemove = new Set(
      dto.removePlayers?.map((id) => id.toString()) || [],
    );

    // Filtrar jugadores existentes (remover los que están en playersToRemove)
    const currentPlayers = seasonHistory.players.filter(
      (id) => !playersToRemove.has(id.toString()),
    );

    // Agregar nuevos jugadores (evitando duplicados)
    const newPlayersSet = new Set([
      ...currentPlayers.map((id) => id.toString()),
      ...playersToAdd.map((id) => id.toString()),
    ]);

    // Actualizar la lista de jugadores
    seasonHistory.players = Array.from(newPlayersSet).map(
      (id) => new Types.ObjectId(id),
    );

    return team.save();
  }

  async createTeamSeason(teamId: string, dto: any): Promise<Team> {
    const team = await this.findById(teamId);

    // Convert string IDs to ObjectId if needed
    const seasonHistoryData = {
      ...dto,
      _id: new Types.ObjectId(),
    };

    // Crear nuevo historial de temporada
    team.seasonHistory.push(seasonHistoryData);

    return await team.save();
  }

  async addPlayersToSeason(
    teamId: string,
    dto: AddSeasonPlayersDto & { seasonHistoryId: string },
  ): Promise<Team> {
    const team = await this.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const seasonHistory = team.seasonHistory.find(
      (history) => history.seasonId.toString() === dto.seasonHistoryId,
    );

    if (!seasonHistory) {
      throw new NotFoundException('Season history not found');
    }

    if (!seasonHistory.active) {
      throw new BadRequestException('Cannot add players to inactive season');
    }

    const maxPlayers = 30;

    // Convertir los IDs de string a ObjectId
    const playersToAdd = dto.players.map((id) => new Types.ObjectId(id));

    // Crear Set de jugadores actuales para verificación eficiente
    const currentPlayersSet = new Set(
      seasonHistory.players.map((p) => p.toString()),
    );

    // Filtrar jugadores que ya existen
    const newPlayers = playersToAdd.filter(
      (player) => !currentPlayersSet.has(player.toString()),
    );

    // Verificar límite de jugadores
    if (seasonHistory.players.length + newPlayers.length > maxPlayers) {
      throw new BadRequestException(
        `Cannot add more players. Maximum limit is ${maxPlayers} players.`,
      );
    }

    // Agregar solo los jugadores nuevos
    seasonHistory.players.push(...newPlayers);

    return await team.save();
  }

  async retirePlayerFromSeason(
    teamId: string,
    seasonId: string,
    playerId: string,
    reason: string = 'baja de jugador',
  ): Promise<Team> {
    const team = await this.findById(teamId);
    const seasonHistory = team.seasonHistory.find(
      (history) => history.seasonId.toString() === seasonId,
    );

    if (!seasonHistory) {
      throw new NotFoundException(
        `Season ${seasonId} not found in team history`,
      );
    }

    const playerIndex = seasonHistory.players.findIndex(
      (p) => p.toString() === playerId,
    );

    if (playerIndex === -1) {
      throw new NotFoundException(`Player ${playerId} not found in team`);
    }

    const now = new Date();
    seasonHistory.retiredPlayers.push({
      playerId: new Types.ObjectId(playerId),
      retiredAt: now,
      reason: reason,
    });

    seasonHistory.players.splice(playerIndex, 1);

    return team.save();
  }

  async updateTeam(
    teamId: string,
    updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    const team = await this.findById(teamId);

    if (updateTeamDto.currentName) {
      team.currentName = updateTeamDto.currentName;
    }

    if (updateTeamDto.franchiseId) {
      team.franchiseId = new Types.ObjectId(updateTeamDto.franchiseId);
    }

    return team.save();
  }

  async updateTeamSeason(
    teamId: string,
    seasonId: string,
    dto: UpdateTeamSeasonDto,
  ): Promise<Team> {
    const team = await this.findById(teamId);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Convertir el seasonId a ObjectId para la comparación
    const seasonObjectId = new Types.ObjectId(seasonId);

    const seasonIndex = team.seasonHistory.findIndex((history) =>
      history._id.equals(seasonObjectId),
    );

    if (seasonIndex === -1) {
      throw new NotFoundException(
        'No se encontró la temporada para este equipo',
      );
    }

    try {
      // Actualizar directamente los campos en el documento existente
      if (dto.teamName) {
        team.seasonHistory[seasonIndex].teamName = dto.teamName;
      }
      if (dto.categoryId) {
        team.seasonHistory[seasonIndex].categoryId = new Types.ObjectId(
          dto.categoryId,
        );
      }
      if (dto.groupId) {
        team.seasonHistory[seasonIndex].groupId = new Types.ObjectId(
          dto.groupId,
        );
      }
      if (typeof dto.active !== 'undefined') {
        team.seasonHistory[seasonIndex].active = dto.active;
      }

      return await team.save();
    } catch (error) {
      if (error.name === 'BSONTypeError') {
        throw new BadRequestException('Invalid MongoDB ID format');
      }
      throw error;
    }
  }

  async remove(teamId: string): Promise<void> {
    const result = await this.teamModel.deleteOne({ _id: teamId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Team not found');
    }
  }

  async getTeamSeasons(teamId: string): Promise<TeamSeasonHistory[]> {
    const team = await this.teamModel
      .findById(teamId)
      .select('seasonHistory')
      .lean();

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team.seasonHistory;
  }

  async removeSeasonFromTeam(teamId: string, seasonId: string): Promise<Team> {
    const team = await this.findById(teamId);

    // Convertir seasonId a ObjectId para comparación
    const seasonObjectId = new Types.ObjectId(seasonId);

    const seasonIndex = team.seasonHistory.findIndex((history) =>
      history._id.equals(seasonObjectId),
    );

    if (seasonIndex === -1) {
      throw new NotFoundException(
        `Season ${seasonId} not found in team history`,
      );
    }

    team.seasonHistory.splice(seasonIndex, 1);
    return team.save();
  }

  async getTeamSeasonById(
    teamId: string,
    seasonId: string,
  ): Promise<TeamSeasonHistory> {
    const team = await this.teamModel
      .findOne(
        { _id: teamId, 'seasonHistory._id': seasonId },
        { 'seasonHistory.$': 1 },
      )
      .lean();

    if (!team || !team.seasonHistory?.length) {
      throw new NotFoundException('Season not found for this team');
    }

    return team.seasonHistory[0];
  }

  async removePlayerFromSeason(
    teamId: string,
    seasonId: string,
    playerId: string,
  ): Promise<Team> {
    const team = await this.findById(teamId);

    const seasonObjectId = new Types.ObjectId(seasonId);
    const playerObjectId = new Types.ObjectId(playerId);

    const seasonIndex = team.seasonHistory.findIndex((history) =>
      history._id.equals(seasonObjectId),
    );

    if (seasonIndex === -1) {
      throw new NotFoundException('Season not found in team history');
    }

    const season = team.seasonHistory[seasonIndex];
    const playerIndex = season.players.findIndex((p) =>
      p.equals(playerObjectId),
    );

    if (playerIndex === -1) {
      throw new NotFoundException('Player not found in season');
    }

    // Sacar de players
    const [removedPlayer] = season.players.splice(playerIndex, 1);

    // Meter a removedPlayers
    season.retiredPlayers.push({
      playerId: removedPlayer,
      reason: 'Baja de jugador',
      retiredAt: new Date(),
    });

    return team.save();
  }
}
