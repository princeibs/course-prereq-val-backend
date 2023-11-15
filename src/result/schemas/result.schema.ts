import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Result {
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
  user_id: string;

  @Prop({
    type: SchemaTypes.String,
    enum: ['100', '200', '300', '400', '500'],
    required: true,
  })
  level: string;

  @Prop({ type: SchemaTypes.String, enum: ['first', 'second'], required: true })
  semester: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Course' })
  course_id: string;

  @Prop({
    type: SchemaTypes.String,
    enum: ['a', 'b', 'c', 'd', 'e', 'f'],
    required: true,
  })
  grade: string;
}

export type ResultDocument = HydratedDocument<Result>;

export const ResultSchema = SchemaFactory.createForClass(Result);
