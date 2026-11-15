import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ timestamps: true, versionKey: false })
export class SubCategory {
  @Prop({ required: true, minlength: 3, maxlength: 20 })
  name: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Types.ObjectId;

  @Prop({ required: false })
  image?: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
