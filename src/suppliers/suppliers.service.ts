
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Suppliers } from './schemas/suppliers.schema.js';
import { CreateSuppliersDto } from './dto/create-suppliers.dto.js';
import { UpdateSuppliersDto } from './dto/update-suppliers.dto.js';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Suppliers.name)
    private readonly suppliersModel: Model<Suppliers>,
  ) {}

  create(dto: CreateSuppliersDto) {
    return this.suppliersModel.create(dto);
  }

  findAll() {
    return this.suppliersModel.find().exec();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Supplier ID');
    }

    const supplier = await this.suppliersModel.findOne({ _id: id });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return supplier;
  }

  async update(id: string, dto: UpdateSuppliersDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Supplier ID');
    }

    const supplier = await this.suppliersModel.findOneAndUpdate(
      { _id: id },
      dto,
      { new: true, runValidators: true },
    );

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return supplier;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Supplier ID');
    }

    const supplier = await this.suppliersModel.findOneAndDelete({ _id: id });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return { message: 'Supplier deleted successfully' };
  }
}
