import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './create-category.dto';
import {
  Category,
  CategoryDocument,
} from 'src/core/models/schemas/category.schema';
import { UpdateCategoryDto } from './update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('liga').exec();
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id).populate('liga').exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .populate('liga')
      .exec();
  }

  async remove(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }

  async findByLiga(ligaId: string): Promise<Category[]> {
    return this.categoryModel.find({ liga: ligaId }).populate('liga').exec();
  }
}
