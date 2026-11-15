import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from './schemas/sub-category.schema.js';
import { Category } from '../category/schemas/category.schema.js';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto.js';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto.js';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name)
    private readonly subModel: Model<SubCategory>,

    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(dto: CreateSubCategoryDto) {
    const category = await this.categoryModel.findById(dto.category);

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    return this.subModel.create(dto);
  }

  findAll() {
    return this.subModel.find().populate('category').exec();
  }

  async findOne(id: string) {
    const sub = await this.subModel
      .findOne({ _id: id } as any)
      .populate('category');

    if (!sub) {
      throw new NotFoundException('Sub Category not found');
    }

    return sub;
  }

  async update(id: string, dto: UpdateSubCategoryDto) {
    if (dto.category) {
      const category = await this.categoryModel.findById(dto.category);
      if (!category) {
        throw new BadRequestException('Category not found');
      }
    }

    const sub = await this.subModel.findOneAndUpdate({ _id: id }, dto, {
      new: true,
      runValidators: true,
    });

    if (!sub) {
      throw new NotFoundException('Sub Category not found');
    }

    return sub;
  }

  async remove(id: string) {
    const sub = await this.subModel.findOneAndDelete({ _id: id });

    if (!sub) {
      throw new NotFoundException('Sub Category not found');
    }

    return { message: 'Sub Category deleted successfully' };
  }
}
