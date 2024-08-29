import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true, minLength: 4, maxlength: 15 })
  firstName: string;

  @Prop({ type: String, required: true, minLength: 1, maxlength: 15 })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true, minLength: 6, maxlength: 15 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type userDocument = User & Document;
