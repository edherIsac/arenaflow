import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { Team } from 'src/core/models/schemas/team.schema';
import { AddSeasonPlayersDto, CreateTeamDto } from './team.dto';

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

  @Post(':id/seasons')
  @ApiOperation({ summary: 'Add or update players for a season' })
  addPlayersToSeason(
    @Param('id') id: string,
    @Body() dto: AddSeasonPlayersDto,
  ) {
    return this.teamService.addPlayersToSeason(id, dto);
  }
}
