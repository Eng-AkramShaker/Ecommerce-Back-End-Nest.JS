import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoryController } from './sub-category.controller.js';
import { SubCategoryService } from './sub-category.service.js';
import {
  SubCategory,
  SubCategorySchema,
} from './schemas/sub-category.schema.js';
import {
  Category,
  CategorySchema,
} from '../category/schemas/category.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
