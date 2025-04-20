import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SeasonService } from './season.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSeasonDto } from './create-season.dto';
import { SeasonResponseDto } from './season-response.dto';
import { UpdateSeasonDto } from './update-season.dto';

@ApiTags('seasons')
@Controller('seasons')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new season' })
  @ApiResponse({
    status: 201,
    description: 'The season has been successfully created.',
    type: SeasonResponseDto,
  })
  async create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonService.create(createSeasonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all seasons' })
  @ApiResponse({
    status: 200,
    description: 'List of all seasons',
    type: [SeasonResponseDto],
  })
  async findAll() {
    return this.seasonService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active seasons' })
  @ApiResponse({
    status: 200,
    description: 'List of active seasons',
    type: [SeasonResponseDto],
  })
  async findActive() {
    return this.seasonService.getActiveSeasons();
  }

  @Get('league/:leagueId')
  @ApiOperation({ summary: 'Get seasons by league ID' })
  @ApiResponse({
    status: 200,
    description: 'List of seasons for the specified league',
    type: [SeasonResponseDto],
  })
  async findByLeague(@Param('leagueId') leagueId: string) {
    return this.seasonService.findByLeague(leagueId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a season by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found season',
    type: SeasonResponseDto,
  })
  async findOne(@Param('id') id: string) {
    return this.seasonService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a season' })
  @ApiResponse({
    status: 200,
    description: 'The updated season',
    type: SeasonResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateSeasonDto: UpdateSeasonDto,
  ) {
    return this.seasonService.update(id, updateSeasonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a season' })
  @ApiResponse({
    status: 200,
    description: 'The deleted season',
    type: SeasonResponseDto,
  })
  async remove(@Param('id') id: string) {
    return this.seasonService.remove(id);
  }
}
