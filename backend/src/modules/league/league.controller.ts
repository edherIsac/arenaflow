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
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LeagueService } from './league.service';
import { League } from './league.swagger.schema';
import { UpdateLeagueDto } from './update-league.dto';
import { CreateLeagueDto } from './create-league.dto';

@ApiBearerAuth()
@ApiTags('Leagues')
@Controller('leagues')
@UseGuards(JwtAuthGuard)
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new league' })
  @ApiCreatedResponse({
    description: 'The league has been successfully created.',
    type: League,
  })
  @ApiBody({ type: CreateLeagueDto })
  async create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leagueService.create(createLeagueDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all leagues' })
  @ApiOkResponse({
    description: 'List of all leagues',
    type: [League],
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Filter leagues by active status',
    type: Boolean,
  })
  async findAll(@Query('isActive') isActive?: boolean) {
    if (isActive !== undefined) {
      return this.leagueService.findByActiveStatus(isActive);
    }
    return this.leagueService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a league by ID' })
  @ApiOkResponse({
    description: 'The found league',
    type: League,
  })
  @ApiParam({
    name: 'id',
    description: 'League ID',
    example: '507f1f77bcf86cd799439011',
  })
  async findOne(@Param('id') id: string) {
    return this.leagueService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a league' })
  @ApiOkResponse({
    description: 'The updated league',
    type: League,
  })
  @ApiParam({
    name: 'id',
    description: 'League ID to update',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({ type: UpdateLeagueDto })
  async update(
    @Param('id') id: string,
    @Body() updateLeagueDto: UpdateLeagueDto,
  ) {
    return this.leagueService.update(id, updateLeagueDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a league' })
  @ApiOkResponse({
    description: 'The deleted league',
    type: League,
  })
  @ApiParam({
    name: 'id',
    description: 'League ID to delete',
    example: '507f1f77bcf86cd799439011',
  })
  async remove(@Param('id') id: string) {
    return this.leagueService.remove(id);
  }
}
