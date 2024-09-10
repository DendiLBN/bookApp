import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    minlength: 6,
    select: false,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
    trim: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
    trim: true,
  })
  lastName: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
