import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { Team, TeamSeasonHistory } from 'src/core/models/schemas/team.schema';
import {
  AddSeasonPlayersDto,
  CreateTeamDto,
  UpdateTeamDto,
  TeamSeasonHistoryDto,
  UpdateTeamSeasonDto,
} from './team.dto';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiOperation({ summary: 'Create new team' })
  @ApiResponse({ status: 201, type: Team })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teams' })
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get team by ID' })
  findById(@Param('id') id: string) {
    return this.teamService.findById(id);
  }

  @Patch(':teamId')
  @ApiOperation({ summary: 'Update team' })
  @ApiResponse({ status: 200, type: Team })
  update(
    @Param('teamId') teamId: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.updateTeam(teamId, updateTeamDto);
  }

  @Post(':teamId/seasons')
  @ApiOperation({ summary: 'Create new team season without players' })
  @ApiResponse({ status: 201, type: Team })
  createTeamSeason(
    @Param('teamId') teamId: string,
    @Body() dto: TeamSeasonHistoryDto,
  ) {
    return this.teamService.createTeamSeason(teamId, dto);
  }

  @Get(':teamId/seasons')
  @ApiOperation({ summary: 'Get all seasons for a team' })
  @ApiResponse({
    status: 200,
    type: TeamSeasonHistory,
    isArray: true,
  })
  getTeamSeasons(@Param('teamId') teamId: string) {
    return this.teamService.getTeamSeasons(teamId);
  }

  @Get(':teamId/seasons/:seasonId')
  @ApiOperation({ summary: 'Get specific team season by ID' })
  @ApiResponse({
    status: 200,
    type: TeamSeasonHistory,
  })
  getTeamSeasonById(
    @Param('teamId') teamId: string,
    @Param('seasonId') seasonId: string,
  ) {
    return this.teamService.getTeamSeasonById(teamId, seasonId);
  }

  @Post(':teamId/seasons/:seasonId/players')
  @ApiOperation({ summary: 'Add players to team season' })
  @ApiResponse({ status: 200, type: Team })
  addPlayersToSeason(
    @Param('teamId') teamId: string,
    @Param('seasonId') seasonId: string,
    @Body() dto: AddSeasonPlayersDto,
  ) {
    return this.teamService.addPlayersToSeason(teamId, {
      ...dto,
      seasonHistoryId: seasonId,
    });
  }

  @Delete(':teamId/season/:seasonId/player/:playerId/retire')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Retire player from season' })
  @ApiResponse({ status: 204, description: 'Player successfully retired' })
  async retirePlayerFromSeason(
    @Param('teamId') teamId: string,
    @Param('seasonId') seasonId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.teamService.retirePlayerFromSeason(
      teamId,
      seasonId,
      playerId,
      'baja de jugador', // Razón fija
    );
  }

  @Patch(':teamId/seasons/:seasonId')
  @ApiOperation({ summary: 'Actualizar temporada de equipo' })
  @ApiResponse({ status: 200, type: Team })
  updateTeamSeason(
    @Param('teamId') teamId: string,
    @Param('seasonId') seasonId: string,
    @Body() dto: UpdateTeamSeasonDto,
  ) {
    return this.teamService.updateTeamSeason(teamId, seasonId, dto);
  }

  @Delete(':teamId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete team' })
  @ApiResponse({ status: 204, description: 'Team successfully deleted' })
  remove(@Param('teamId') teamId: string) {
    return this.teamService.remove(teamId);
  }

  @Delete(':teamId/seasons/:seasonId')
  @ApiOperation({ summary: 'Remove season from team' })
  @ApiResponse({ status: 200, type: Team })
  removeSeason(
    @Param('teamId') teamId: string,
    @Param('seasonId') seasonId: string,
  ) {
    return this.teamService.removeSeasonFromTeam(teamId, seasonId);
  }

  @Delete(':teamId/seasons/:seasonId/player/:playerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove player from team season history' })
  @ApiResponse({ status: 204, description: 'Player successfully removed' })
  removePlayerFromSeason(
    @Param('teamId') teamId: string,
    @Param('seasonId') seasonId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.teamService.removePlayerFromSeason(teamId, seasonId, playerId);
  }
}
