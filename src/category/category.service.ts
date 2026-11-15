import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { Category } from './schemas/category.schema.js';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const last = await this.categoryModel.findOne().sort({ id: -1 });

    const id = Number(last?.id ?? 0) + 1;

    return this.categoryModel.create({ ...dto, id } as any);
  }

  findAll() {
    return this.categoryModel.find().sort({ id: 1 }).exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findOne({ _id: id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.categoryModel.findOneAndUpdate(
      { _id: id },
      dto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async remove(id: string) {
    const category = await this.categoryModel.findOneAndDelete({ _id: id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return { message: 'Category deleted successfully' };
  }
}
