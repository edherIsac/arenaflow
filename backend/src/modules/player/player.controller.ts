import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './create.player.dto';
import { Player, UpdatePlayerDto } from './player.swagger';

@ApiTags('players')
@Controller('players')
@UseGuards(JwtAuthGuard)
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo jugador' })
  @ApiResponse({
    status: 201,
    description: 'El jugador ha sido creado exitosamente.',
    type: Player,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({
    status: 409,
    description: 'Conflicto (INE o CURP ya existen)',
  })
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los jugadores' })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    description: 'Filtrar solo jugadores activos',
    type: Boolean,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los jugadores',
    type: [Player],
  })
  async findAll(@Query('activeOnly') activeOnly: string) {
    const filterActive = activeOnly === 'false' ? false : true;
    return this.playerService.findAll(filterActive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un jugador por ID' })
  @ApiParam({ name: 'id', description: 'ID del jugador', type: String })
  @ApiResponse({ status: 200, description: 'Jugador encontrado', type: Player })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }

  @Get('ine/:ineKey')
  @ApiOperation({ summary: 'Obtener un jugador por clave INE' })
  @ApiParam({
    name: 'ineKey',
    description: 'Clave INE del jugador',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Jugador encontrado', type: Player })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  async findByIneKey(@Param('ineKey') ineKey: string) {
    return this.playerService.findByIneKey(ineKey);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un jugador' })
  @ApiParam({ name: 'id', description: 'ID del jugador', type: String })
  @ApiResponse({
    status: 200,
    description: 'Jugador actualizado',
    type: Player,
  })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playerService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un jugador' })
  @ApiParam({ name: 'id', description: 'ID del jugador', type: String })
  @ApiResponse({
    status: 200,
    description: 'Jugador eliminado',
    type: Player,
  })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  async remove(@Param('id') id: string) {
    return this.playerService.remove(id);
  }

  @Put(':id/deactivate')
  @ApiOperation({ summary: 'Desactivar un jugador' })
  @ApiParam({ name: 'id', description: 'ID del jugador', type: String })
  @ApiResponse({
    status: 200,
    description: 'Jugador desactivado',
    type: Player,
  })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  async deactivate(@Param('id') id: string) {
    return this.playerService.deactivate(id);
  }

  @Put(':id/activate')
  @ApiOperation({ summary: 'Activar un jugador' })
  @ApiParam({ name: 'id', description: 'ID del jugador', type: String })
  @ApiResponse({
    status: 200,
    description: 'Jugador activado',
    type: Player,
  })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  async activate(@Param('id') id: string) {
    return this.playerService.activate(id);
  }
}
