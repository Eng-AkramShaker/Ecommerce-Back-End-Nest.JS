import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SuppliersDocument = HydratedDocument<Suppliers>;

@Schema({ timestamps: true, versionKey: false })
export class Suppliers {
  @Prop({ required: true, trim: true })
  Name: string;

  @Prop({ required: true })
  website: string;
}

export const SuppliersSchema = SchemaFactory.createForClass(Suppliers);
