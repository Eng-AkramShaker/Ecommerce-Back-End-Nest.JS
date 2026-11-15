import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { createObserveModule } from '@nestjs/observe';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './auth/user/user.module.js';
import { CategoryModule } from './category/category.module.js';
import { SubCategoryModule } from './sub-category/sub-category.module.js';
import { BrandModule } from './brand/brand.module.js';
import { CouponModule } from './coupon/coupon.module.js';
import { SuppliersModule } from './suppliers/suppliers.module.js';
import { RequestProductModule } from './request-product/request-product.module.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  // mongodb
  imports: [// mongoose
    MongooseModule.forRoot('mongodb://localhost:27017/Ecommerce-db'),

    UserModule,

    // config
    ConfigModule.forRoot({}),

    // jwt
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) || 3600 },
    }),

    // Category
    CategoryModule,
    SubCategoryModule,
    BrandModule,
    CouponModule,
    SuppliersModule,
    RequestProductModule,],

  controllers: [],
  providers: [],
})
export class AppModule {}
