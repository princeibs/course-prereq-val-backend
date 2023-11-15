import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Course {
  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  code: string;

  @Prop({ type: SchemaTypes.String, required: true })
  title: string;

  @Prop({ type: SchemaTypes.String, required: true })
  credit_units: string;

  @Prop({
    type: SchemaTypes.String,
    enum: ['core', 'elective', 'general'],
    required: true,
  })
  status: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Course', default: null })
  prerequisite: string;
}

export type CourseDocument = HydratedDocument<Course>;

export const CourseSchema = SchemaFactory.createForClass(Course);
