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
import { MatchResult } from 'src/core/models/schemas/match-result.schema';
import { MatchResultService } from './matches-results.service';
import { CreateMatchResultDto } from './create-match-result.dto';

@ApiTags('Match Results')
@Controller('match-results')
@UseGuards(JwtAuthGuard)
export class MatchResultController {
  constructor(private readonly matchResultService: MatchResultService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo resultado de match' })
  @ApiResponse({
    status: 201,
    description: 'Resultado de match creado exitosamente',
    type: MatchResult,
  })
  @ApiBody({ type: CreateMatchResultDto })
  create(
    @Body() createMatchResultDto: CreateMatchResultDto,
  ): Promise<MatchResult> {
    return this.matchResultService.create(createMatchResultDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los resultados de los partidos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de resultados de partidos',
    type: [MatchResult],
  })
  findAll(): Promise<MatchResult[]> {
    return this.matchResultService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un resultado de match por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID del resultado de match',
  })
  @ApiResponse({
    status: 200,
    description: 'Resultado de match encontrado',
    type: MatchResult,
  })
  @ApiResponse({ status: 404, description: 'Resultado de match no encontrado' })
  findOne(@Param('id') id: string): Promise<MatchResult> {
    return this.matchResultService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un resultado de match por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID del resultado de match',
  })
  @ApiBody({ type: CreateMatchResultDto })
  @ApiResponse({
    status: 200,
    description: 'Resultado de match actualizado',
    type: MatchResult,
  })
  @ApiResponse({ status: 404, description: 'Resultado de match no encontrado' })
  update(
    @Param('id') id: string,
    @Body() createMatchResultDto: CreateMatchResultDto,
  ): Promise<MatchResult> {
    return this.matchResultService.update(id, createMatchResultDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un resultado de match por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID del resultado de match',
  })
  @ApiResponse({
    status: 200,
    description: 'Resultado de match eliminado',
    type: MatchResult,
  })
  @ApiResponse({ status: 404, description: 'Resultado de match no encontrado' })
  remove(@Param('id') id: string): Promise<MatchResult> {
    return this.matchResultService.remove(id);
  }
}
