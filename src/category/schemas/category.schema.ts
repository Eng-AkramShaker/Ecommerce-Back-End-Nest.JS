import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true,
  })
  name: string;

  @Prop()
  image?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
