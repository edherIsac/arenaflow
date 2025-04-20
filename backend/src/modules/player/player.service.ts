import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from 'src/core/models/schemas/player.schema';
import { UpdatePlayerDto } from './update-player.dto';
import { CreatePlayerDto } from './create.player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const createdPlayer = new this.playerModel({
      ...createPlayerDto,
      dateAt: createPlayerDto.dateAt || new Date(),
      isActive:
        createPlayerDto.isActive !== undefined
          ? createPlayerDto.isActive
          : true,
    });
    return createdPlayer.save();
  }

  async findAll(activeOnly = true): Promise<Player[]> {
    const query = activeOnly ? { isActive: true } : {};
    return this.playerModel.find(query).exec();
  }

  async findOne(id: string): Promise<Player> {
    return this.playerModel.findById(id).exec();
  }

  async findByIneKey(ineKey: string): Promise<Player> {
    return this.playerModel.findOne({ ineKey }).exec();
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return this.playerModel
      .findByIdAndUpdate(id, updatePlayerDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Player> {
    return this.playerModel.findByIdAndDelete(id).exec();
  }

  async deactivate(id: string): Promise<Player> {
    return this.playerModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec();
  }

  async activate(id: string): Promise<Player> {
    return this.playerModel
      .findByIdAndUpdate(id, { isActive: true }, { new: true })
      .exec();
  }
}
