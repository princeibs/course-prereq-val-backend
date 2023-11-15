import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { Result, ResultSchema } from 'src/result/schemas/result.schema';
import {
  RegisteredCourse,
  RegisteredCourseSchema,
} from './schemas/registered-course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Result.name, schema: ResultSchema },
      { name: RegisteredCourse.name, schema: RegisteredCourseSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
