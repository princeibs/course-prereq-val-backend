import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class RegisteredCourse {
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
  user_id: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Course' })
  course_id: string;
}

export type RegisteredCourseDocument = HydratedDocument<RegisteredCourse>;

export const RegisteredCourseSchema =
  SchemaFactory.createForClass(RegisteredCourse);
