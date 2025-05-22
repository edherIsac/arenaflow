import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { MatchService } from './matches.service';
import { CreateMatchDto } from './create-match.dto';
import { Match } from 'src/core/models/schemas/match.schema';
import { UpdateMatchDto } from './update-match.dto';
import { UpdateJornadaDto } from './jornada.dto';

@ApiTags('Matches') // Nombre de la categoría en Swagger
@Controller('matches')
@UseGuards(JwtAuthGuard)
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo match' })
  @ApiResponse({
    status: 201,
    description: 'Match creado exitosamente',
    type: Match,
  })
  @ApiBody({ type: CreateMatchDto })
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los matches' })
  @ApiResponse({ status: 200, description: 'Lista de matches', type: [Match] })
  findAll(): Promise<Match[]> {
    return this.matchService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un match por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del match' })
  @ApiResponse({ status: 200, description: 'Match encontrado', type: Match })
  @ApiResponse({ status: 404, description: 'Match no encontrado' })
  findOne(@Param('id') id: string): Promise<Match> {
    return this.matchService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un match por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del match' })
  @ApiBody({ type: UpdateMatchDto })
  @ApiResponse({ status: 200, description: 'Match actualizado', type: Match })
  @ApiResponse({ status: 404, description: 'Match no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateMatchDto: UpdateMatchDto,
  ): Promise<Match> {
    return this.matchService.update(id, updateMatchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un match por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del match' })
  @ApiResponse({ status: 200, description: 'Match eliminado', type: Match })
  @ApiResponse({ status: 404, description: 'Match no encontrado' })
  remove(@Param('id') id: string) {
    return this.matchService.remove(id);
  }

  @Patch(':matchId/jornadas/:jornadaIndex')
  async updateJornada(
    @Param('matchId') matchId: string,
    @Param('jornadaIndex') jornadaIndex: number,
    @Body() updateData: UpdateJornadaDto,
  ) {
    return this.matchService.updateJornada(
      matchId,
      Number(jornadaIndex),
      updateData,
    );
  }

  @Get('group/:groupId/jornada/:jornadaNum')
  @ApiOperation({ summary: 'Obtener matches por grupo y número de jornada' })
  @ApiParam({ name: 'groupId', description: 'ID del grupo' })
  @ApiParam({ name: 'jornadaNum', description: 'Número de jornada' })
  @ApiResponse({
    status: 200,
    description: 'Matches de la jornada encontrados',
    type: [Match],
  })
  @ApiResponse({ status: 404, description: 'No se encontraron matches' })
  async getJornadaByGroup(
    @Param('groupId') groupId: string,
    @Param('jornadaNum') jornadaNum: number,
  ): Promise<Match[]> {
    return this.matchService.getJornadaByGroup(groupId, Number(jornadaNum));
  }
}
