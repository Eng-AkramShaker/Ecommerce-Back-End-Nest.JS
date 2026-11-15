import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BrandController } from './brand.controller.js';
import { BrandService } from './brand.service.js';
import { Brand, BrandSchema } from './schemas/brand.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
