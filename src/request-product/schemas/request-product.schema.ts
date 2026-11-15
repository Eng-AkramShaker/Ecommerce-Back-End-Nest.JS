import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RequestProductDocument = HydratedDocument<RequestProduct>;

@Schema({ timestamps: true, versionKey: false })
export class RequestProduct {
  @Prop({ required: true, trim: true })
  titleNeed: string;

  @Prop({ required: true, minlength: 5 })
  details: string;

  @Prop({ required: true, min: 1 })
  qauntity: number;

  @Prop()
  Category?: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  User: Types.ObjectId;
}

export const RequestProductSchema =
  SchemaFactory.createForClass(RequestProduct);
