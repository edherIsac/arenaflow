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
import { CategoryService } from './category.service';
import { Category } from './category.schema.swagger';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse({
    description: 'The category has been successfully created.',
    type: Category,
  })
  @ApiBody({ type: CreateCategoryDto })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({
    description: 'List of all categories',
    type: [Category],
  })
  @ApiQuery({
    name: 'liga',
    required: false,
    description: 'Filter categories by liga ID',
  })
  async findAll(@Query('liga') ligaId?: string) {
    if (ligaId) {
      return this.categoryService.findByLiga(ligaId);
    }
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiOkResponse({
    description: 'The found category',
    type: Category,
  })
  @ApiParam({
    name: 'id',
    description: 'Category ID',
    example: '507f1f77bcf86cd799439011',
  })
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiOkResponse({
    description: 'The updated category',
    type: Category,
  })
  @ApiParam({
    name: 'id',
    description: 'Category ID to update',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({ type: UpdateCategoryDto })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiOkResponse({
    description: 'The deleted category',
    type: Category,
  })
  @ApiParam({
    name: 'id',
    description: 'Category ID to delete',
    example: '507f1f77bcf86cd799439011',
  })
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
