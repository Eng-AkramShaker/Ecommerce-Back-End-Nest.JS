import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6,
    maxlength:100,
    select: false,
  })
  password: string;

  @Prop({
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: string;

  @Prop({ type: String })
  avatar?: string;

  @Prop({ type: Number, min: 1, max: 120 })
  age?: number;

  @Prop({ type: String })
  phoneNumber?: string;

  @Prop({ type: String })
  address?: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: String })
  verificationCode?: string;

  @Prop({
    type: String,
    enum: ['male', 'female'],
  })
  gender?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
