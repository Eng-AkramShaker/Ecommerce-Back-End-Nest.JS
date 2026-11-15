import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RequestProductController } from './request-product.controller.js';
import { RequestProductService } from './request-product.service.js';
import {
  RequestProduct,
  RequestProductSchema,
} from './schemas/request-product.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RequestProduct.name,
        schema: RequestProductSchema,
      },
    ]),
  ],
  controllers: [RequestProductController],
  providers: [RequestProductService],
})
export class RequestProductModule {}
