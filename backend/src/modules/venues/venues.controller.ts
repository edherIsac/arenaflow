import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVenueDto } from './dto/create-venue.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { VenuesService } from './venues.service';

@ApiTags('Venues')
@Controller('venues')
@UseGuards(JwtAuthGuard)
export class VenueController {
  constructor(private readonly venueService: VenuesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una sede' })
  @ApiResponse({ status: 201, description: 'Sede creada exitosamente.' })
  @ApiBody({ type: CreateVenueDto })
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las sedes' })
  findAll() {
    return this.venueService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sede por ID' })
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una sede' })
  @ApiResponse({ status: 200, description: 'Sede actualizada.' })
  @ApiBody({ type: UpdateVenueDto })
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.update(id, updateVenueDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una sede' })
  remove(@Param('id') id: string) {
    return this.venueService.remove(id);
  }
}
