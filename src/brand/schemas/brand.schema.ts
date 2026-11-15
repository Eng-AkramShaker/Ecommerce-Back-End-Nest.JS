import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true, versionKey: false })
export class Brand {
  @Prop({
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  })
  name: string;

  @Prop({ type: String })
  image?: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);