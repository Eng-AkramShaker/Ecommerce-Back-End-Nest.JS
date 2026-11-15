
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Coupon } from './schemas/coupon.schema.js';
import { CreateCouponDto } from './dto/create-coupon.dto.js';
import { UpdateCouponDto } from './dto/update-coupon.dto.js';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name)
    private readonly couponModel: Model<Coupon>,
  ) {}

  create(dto: CreateCouponDto) {
    return this.couponModel.create(dto);
  }

  findAll() {
    return this.couponModel.find().exec();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Coupon ID');
    }

    const coupon = await this.couponModel.findOne({ _id: id });

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    return coupon;
  }

  async update(id: string, dto: UpdateCouponDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Coupon ID');
    }

    const coupon = await this.couponModel.findOneAndUpdate(
      { _id: id },
      dto,
      { new: true, runValidators: true },
    );

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    return coupon;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Coupon ID');
    }

    const coupon = await this.couponModel.findOneAndDelete({ _id: id });

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    return { message: 'Coupon deleted successfully' };
  }
}
