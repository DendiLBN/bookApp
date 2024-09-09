import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ type: String, required: true, minlength: 6, maxlength: 15 })
  password: string;

  //   @Prop({ type: String, required: true, minlength: 1, maxlength: 20 })
  //   firstname: string;

  //   @Prop({ type: String, required: true, minlength: 1, maxlength: 20 })
  //   lastname: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
