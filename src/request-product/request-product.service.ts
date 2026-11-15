import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { RequestProduct } from './schemas/request-product.schema.js';
import { CreateRequestProductDto } from './dto/create-request-product.dto.js';
import { UpdateRequestProductDto } from './dto/update-request-product.dto.js';

@Injectable()
export class RequestProductService {
  constructor(
    @InjectModel(RequestProduct.name)
    private readonly requestModel: Model<RequestProduct>,
  ) {}

  create(dto: CreateRequestProductDto, userId: string) {
    return this.requestModel.create({
      ...dto,
      User: userId,
    });
  }

  findAll() {
    return this.requestModel.find().populate('User').exec();
  }

  async findOne(id: string, userId: string, role: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Request ID');
    }

    const filter: any = { _id: id };

    if (role !== 'admin') {
      filter.User = userId;
    }

    const request = await this.requestModel.findOne(filter);

    if (!request) {
      throw new NotFoundException('Request Product not found');
    }

    return request;
  }

  async update(id: string, dto: UpdateRequestProductDto, userId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Request ID');
    }

    const request = await this.requestModel.findOneAndUpdate(
      { _id: id, User: userId },
      dto,
      { new: true, runValidators: true },
    );

    if (!request) {
      throw new NotFoundException('Request Product not found');
    }

    return request;
  }

  async remove(id: string, userId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Request ID');
    }

    const request = await this.requestModel.findOneAndDelete({
      _id: id,
      User: userId,
    });

    if (!request) {
      throw new NotFoundException('Request Product not found');
    }

    return { message: 'Request Product deleted successfully' };
  }
}
