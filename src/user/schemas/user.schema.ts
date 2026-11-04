import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  // Add schema fields with @Prop(), for example:
  // @Prop({ required: true })
  // name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
