import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Match, MatchDocument } from 'src/core/models/schemas/match.schema';
import { CreateMatchDto } from './create-match.dto';
import { UpdateMatchDto } from './update-match.dto';
import { JornadaDto, UpdateJornadaDto } from './jornada.dto';
import { GroupDocument } from '../group/group.swagger.schema';
import { Group } from '../group/group.swagger.schema';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const MIN_TEAMS = 3;

    // Asegurarse de que el groupId es un ObjectId válido
    if (!Types.ObjectId.isValid(createMatchDto.group)) {
      throw new BadRequestException('ID de grupo no válido');
    }

    const id = new Types.ObjectId(createMatchDto.group);
    console.log(id);

    const tmp = await this.groupModel.findById(createMatchDto.group);
    console.log(tmp);

    const group = await this.groupModel
      .findById(createMatchDto.group)
      .select('teams')
      .lean()
      .exec();

    // console.log(group);

    if (!group) throw new NotFoundException('Grupo no encontrado');

    // Verificar equipos
    if (!group.teams || group.teams.length < MIN_TEAMS) {
      throw new BadRequestException(
        `El grupo debe tener al menos ${MIN_TEAMS} equipos`,
      );
    }

    if (!createMatchDto.jornadas?.length) {
      // No necesitamos convertir ObjectIds a strings aquí
      const teamIds = group.teams.map((id) => id.toString());
      createMatchDto.jornadas = this.generateJornadas(teamIds);
    }

    const createdMatch = new this.matchModel(createMatchDto);
    return createdMatch.save();
  }

  private generateJornadas(teamIds: string[]): JornadaDto[] {
    const jornadas: JornadaDto[] = [];
    const teamList = [...teamIds];
    const isOdd = teamList.length % 2 !== 0;

    if (isOdd) {
      teamList.push('BYE');
    }

    const totalTeams = teamList.length;
    const totalJornadas = totalTeams - 1;
    const matchesPerJornada = Math.floor(totalTeams / 2);

    for (let jornadaNum = 1; jornadaNum <= totalJornadas; jornadaNum++) {
      // Generar todos los partidos de una jornada
      for (let i = 0; i < matchesPerJornada; i++) {
        const teamA = teamList[i];
        const teamB = teamList[totalTeams - 1 - i];

        if (teamA === 'BYE' || teamB === 'BYE') {
          jornadas.push({
            teamA: teamA === 'BYE' ? null : teamA,
            teamB: teamB === 'BYE' ? null : teamB,
            numero: jornadaNum,
            isBye: true,
          });
        } else {
          jornadas.push({
            teamA,
            teamB,
            numero: jornadaNum,
            isBye: false,
          });
        }
      }
      // Rotación de equipos (excepto el primero)
      teamList.splice(1, 0, teamList.pop()!);
    }

    return jornadas;
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

  async updateJornada(
    matchId: string,
    jornadaIndex: number,
    updateData: UpdateJornadaDto,
  ): Promise<Match> {
    // Validar índice
    const match = await this.matchModel.findById(matchId);
    if (!match) throw new NotFoundException('Match no encontrado');
    if (jornadaIndex < 0 || jornadaIndex >= match.jornadas.length) {
      throw new BadRequestException('Índice de jornada inválido');
    }

    // Validar coherencia isBye vs equipos
    if (
      updateData.isBye &&
      !(updateData.teamA === null || updateData.teamB === null)
    ) {
      throw new BadRequestException(
        'Jornada de descanso debe tener un equipo null',
      );
    }

    return this.matchModel
      .findByIdAndUpdate(
        matchId,
        {
          $set: {
            [`jornadas.${jornadaIndex}`]: updateData,
          },
        },
        { new: true },
      )
      .exec();
  }

  async getJornadaByGroup(groupId: string, jornadaNum: number): Promise<any[]> {
    if (!Types.ObjectId.isValid(groupId)) {
      throw new BadRequestException('ID de grupo no válido');
    }

    const matches = await this.matchModel
      .find({ group: groupId })
      .populate('jornadas.teamA jornadas.teamB')
      .lean()
      .exec();

    if (!matches || matches.length === 0) {
      throw new NotFoundException(
        `No se encontraron matches para el grupo ${groupId}`,
      );
    }

    // Procesamos los resultados para extraer solo los partidos de la jornada solicitada
    const resultados = [];

    for (const match of matches) {
      for (const jornada of match.jornadas) {
        if (jornada.numero === jornadaNum) {
          resultados.push({
            matchId: match._id,
            ...jornada,
          });
        }
      }
    }

    if (resultados.length === 0) {
      throw new NotFoundException(
        `No se encontraron partidos para la jornada ${jornadaNum} del grupo ${groupId}`,
      );
    }

    return resultados;
  }
}
