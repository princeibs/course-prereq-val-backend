import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User {
  // @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
  // user_id: string;

  @Prop({ type: SchemaTypes.String, required: true })
  matric_number: string;

  @Prop({ type: SchemaTypes.String, required: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true })
  full_name: string;

  @Prop({ type: SchemaTypes.String, required: true })
  role: string;

  @Prop({ type: SchemaTypes.String, required: true })
  password: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
