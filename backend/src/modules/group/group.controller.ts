import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GroupService } from './group.service';
import { Group } from './group.swagger.schema';
import { CreateGroupDto } from './create-group.dto';
import { UpdateGroupDto } from './update-group.dto';
import { AddTeamsDto } from '../teams/add-teams.dto';

@ApiBearerAuth()
@ApiTags('Groups')
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiCreatedResponse({
    description: 'The group has been successfully created.',
    type: Group,
  })
  @ApiBody({ type: CreateGroupDto })
  async create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all groups' })
  @ApiOkResponse({
    description: 'List of all groups',
    type: [Group],
  })
  @ApiQuery({
    name: 'league',
    required: false,
    description: 'Filter groups by league ID',
  })
  @ApiQuery({
    name: 'season',
    required: false,
    description: 'Filter groups by season ID',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter groups by category ID',
  })
  async findAll(
    @Query('league') leagueId?: string,
    @Query('season') seasonId?: string,
    @Query('category') categoryId?: string,
  ) {
    if (leagueId) {
      return this.groupService.findByLeague(leagueId);
    }
    if (seasonId) {
      return this.groupService.findBySeason(seasonId);
    }
    if (categoryId) {
      return this.groupService.findByCategory(categoryId);
    }
    return this.groupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a group by ID' })
  @ApiOkResponse({
    description: 'The found group',
    type: Group,
  })
  @ApiParam({
    name: 'id',
    description: 'Group ID',
    example: '507f1f77bcf86cd799439011',
  })
  async findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a group' })
  @ApiOkResponse({
    description: 'The updated group',
    type: Group,
  })
  @ApiParam({
    name: 'id',
    description: 'Group ID to update',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({ type: UpdateGroupDto })
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a group' })
  @ApiOkResponse({
    description: 'The deleted group',
    type: Group,
  })
  @ApiParam({
    name: 'id',
    description: 'Group ID to delete',
    example: '507f1f77bcf86cd799439011',
  })
  async remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }

  @Patch(':groupId/teams')
  @ApiOperation({ summary: 'Agregar equipos a un grupo' })
  @ApiOkResponse({
    description: 'The updated group',
    type: Group,
  })
  async addTeams(@Param('groupId') groupId: string, @Body() dto: AddTeamsDto) {
    return this.groupService.addTeamsToGroup(groupId, dto.teamIds);
  }

  @Delete(':groupId/teams/:teamId')
  @ApiOperation({ summary: 'Eliminar equipo de un grupo' })
  @ApiOkResponse({
    description: 'El grupo actualizado',
    type: Group,
  })
  async removeTeam(
    @Param('groupId') groupId: string,
    @Param('teamId') teamId: string,
  ) {
    return this.groupService.removeTeamFromGroup(groupId, teamId);
  }
}
