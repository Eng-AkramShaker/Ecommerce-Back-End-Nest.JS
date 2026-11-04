import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  // Name
  @Prop({ required: true, minlength: 3, maxlength: 30 })
  name: string;

  // Email
  @Prop({
    required: true,
    unique: true,
    min: [2, 'Email must be at least 3 characters long'],
    max: [30, 'Email must be at most 30 characters long'],
  })
  email: string;

  // Password
  @Prop({
    required: true,
    min: [6, 'Password must be at least 6 characters long'],
    max: [30, 'Password must be at most 30 characters long'],
  })
  password: string;

  // Role
  @Prop({ type: String, enum: ['User', 'Admin'], default: 'User' })
  role: string;

  // Avatar
  @Prop({ type: String })
  avatar?: string;

  // Age
  @Prop({ type: Number })
  age?: number;

  // Phone Number
  @Prop({ type: String })
  phoneNumber?: string;

  // Address
  @Prop({ type: String })
  address?: string;

  // Active
  @Prop({ type: Boolean, default: true })
  active: boolean;

  // Verification Code
  @Prop({ type: String })
  verificationCode?: string;

  // Gender
  @Prop({
    type: String,
    enum: ['male', 'female'],
    required: false,
  })
  gender?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
