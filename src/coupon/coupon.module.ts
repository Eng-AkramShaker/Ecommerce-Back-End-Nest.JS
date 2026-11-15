import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CouponController } from './coupon.controller.js';
import { CouponService } from './coupon.service.js';
import { Coupon, CouponSchema } from './schemas/coupon.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coupon.name, schema: CouponSchema },
    ]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}