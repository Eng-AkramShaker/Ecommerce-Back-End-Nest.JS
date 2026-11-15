import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SuppliersController } from './suppliers.controller.js';
import { SuppliersService } from './suppliers.service.js';
import { Suppliers, SuppliersSchema } from './schemas/suppliers.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Suppliers.name, schema: SuppliersSchema },
    ]),
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
