import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CouponDocument = HydratedDocument<Coupon>;

@Schema({ timestamps: true, versionKey: false })
export class Coupon {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, type: Date })
  Expirdate: Date;

  @Prop({ required: true, min: 0 })
  Discount: number;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
