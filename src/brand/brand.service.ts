
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from './schemas/brand.schema.js';
import { CreateBrandDto } from './dto/create-brand.dto.js';
import { UpdateBrandDto } from './dto/update-brand.dto.js';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<Brand>,
  ) {}

  create(dto: CreateBrandDto) {
    return this.brandModel.create(dto);
  }

  findAll() {
    return this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findOne({ _id: id });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  async update(id: string, dto: UpdateBrandDto) {
    const brand = await this.brandModel.findOneAndUpdate(
      { _id: id },
      dto,
      { new: true, runValidators: true },
    );

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  async remove(id: string) {
    const brand = await this.brandModel.findOneAndDelete({ _id: id });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return { message: 'Brand deleted successfully' };
  }
}
