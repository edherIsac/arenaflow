import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { Penalty } from '../../core/models/schemas/penalty.schema';
import { PenaltyService } from './penalty.service';
import { CreatePenaltyDto } from './create-penalty.dto';
import { PenaltyFilter } from './penalty-filter.dto';
import { UpdatePenaltyDto } from './update-penalty.dto';

@ApiTags('Penalties')
@Controller('penalties')
export class PenaltyController {
  constructor(private readonly penaltyService: PenaltyService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva penalización' })
  @ApiResponse({
    status: 201,
    description: 'Penalización creada',
    type: Penalty,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreatePenaltyDto })
  create(@Body() penaltyData: CreatePenaltyDto): Promise<Penalty> {
    return this.penaltyService.create(penaltyData);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de penalizaciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de penalizaciones',
    type: [Penalty],
  })
  @ApiQuery({ name: 'filter', type: PenaltyFilter, required: false })
  findAll(@Query() filter: PenaltyFilter): Promise<Penalty[]> {
    return this.penaltyService.findAll(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una penalización por ID' })
  @ApiResponse({
    status: 200,
    description: 'Penalización encontrada',
    type: Penalty,
  })
  @ApiResponse({ status: 404, description: 'Penalización no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la penalización' })
  findOne(@Param('id') id: string): Promise<Penalty> {
    return this.penaltyService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una penalización' })
  @ApiResponse({
    status: 200,
    description: 'Penalización actualizada',
    type: Penalty,
  })
  @ApiResponse({ status: 404, description: 'Penalización no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la penalización' })
  @ApiBody({ type: UpdatePenaltyDto })
  update(
    @Param('id') id: string,
    @Body() penaltyData: UpdatePenaltyDto,
  ): Promise<Penalty> {
    return this.penaltyService.update(id, penaltyData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una penalización' })
  @ApiResponse({ status: 200, description: 'Penalización eliminada' })
  @ApiResponse({ status: 404, description: 'Penalización no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la penalización' })
  remove(@Param('id') id: string) {
    return this.penaltyService.remove(id);
  }
}
