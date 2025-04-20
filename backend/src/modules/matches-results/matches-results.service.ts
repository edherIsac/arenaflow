import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MatchResult } from 'src/core/models/schemas/match-result.schema';
import { CreateMatchResultDto } from './create-match-result.dto';

@Injectable()
export class MatchResultService {
  constructor(
    @InjectModel(MatchResult.name)
    private readonly matchResultModel: Model<MatchResult>,
  ) {}

  // Crear un nuevo resultado de match
  async create(
    createMatchResultDto: CreateMatchResultDto,
  ): Promise<MatchResult> {
    const createdMatchResult = new this.matchResultModel(createMatchResultDto);
    return createdMatchResult.save();
  }

  // Obtener todos los resultados de los partidos
  async findAll(): Promise<MatchResult[]> {
    return this.matchResultModel.find().exec();
  }

  // Obtener un resultado de match por su ID
  async findOne(id: string): Promise<MatchResult> {
    const matchResult = await this.matchResultModel.findById(id).exec();
    if (!matchResult) {
      throw new NotFoundException(
        `Resultado de partido con ID ${id} no encontrado`,
      );
    }
    return matchResult;
  }

  // Actualizar un resultado de match por su ID
  async update(
    id: string,
    updateMatchResultDto: CreateMatchResultDto,
  ): Promise<MatchResult> {
    const updatedMatchResult = await this.matchResultModel
      .findByIdAndUpdate(id, updateMatchResultDto, { new: true })
      .exec();

    if (!updatedMatchResult) {
      throw new NotFoundException(
        `Resultado de partido con ID ${id} no encontrado`,
      );
    }

    return updatedMatchResult;
  }

  // Eliminar un resultado de match por su ID
  async remove(id: string): Promise<MatchResult> {
    const deletedMatchResult = await this.matchResultModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedMatchResult) {
      throw new NotFoundException(
        `Resultado de partido con ID ${id} no encontrado`,
      );
    }

    return deletedMatchResult;
  }
}
