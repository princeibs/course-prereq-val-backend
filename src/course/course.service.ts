import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result } from 'src/result/schemas/result.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { RegisterCourseDto } from './dto/register-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schemas/course.schema';
import { RegisteredCourse } from './schemas/registered-course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Result.name) private resultModel: Model<Result>,
    @InjectModel(RegisteredCourse.name)
    private registeredCourseModel: Model<RegisteredCourse>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const course = await this.courseModel.findOne({
        code: createCourseDto.code,
      });

      if (course) {
        const updatedCourse = await course.updateOne(
          { ...createCourseDto },
          { new: true },
        );

        if (!updatedCourse) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Failed to update course',
          };
        } else {
          return {
            statusCode: HttpStatus.OK,
            message: 'Update course successful',
          };
        }
      }

      const newCourse = await this.courseModel.create({
        ...createCourseDto,
      });

      if (newCourse) {
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Create course successful',
        };
      } else {
        return {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Failed to create course',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating course',
        error,
      };
    }
  }

  async findAll() {
    try {
      const courses = await this.courseModel
        .find()
        .populate('prerequisite', 'code');

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: {
          courses,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error finding all course',
        error,
      };
    }
  }

  async findByQuery(query: any) {
    try {
      const courses = await this.courseModel.find(query);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: {
          courses,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error finding course',
        error,
      };
    }
  }

  async register(userId: any, registerCourseDto: RegisterCourseDto) {
    try {
      const course = await this.courseModel.findById(
        registerCourseDto.course_id,
      );

      if (!course) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid course Id',
        };
      }

      const hasRegistered = await this.registeredCourseModel.findOne({
        user_id: userId,
        course_id: course.id,
      });

      if (hasRegistered) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `User already registered for ${course.title} (${course.code})`,
        };
      }

      if (course?.prerequisite) {
        const prerequisiteCourse = await this.courseModel.findById(
          course.prerequisite,
        );

        const prerequisiteCourseResult = await this.resultModel.findOne({
          user_id: userId,
          course_id: prerequisiteCourse.id,
        });

        if (!prerequisiteCourseResult) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: `Cannot find result for prerequisite course (${prerequisiteCourse.code})`,
          };
        }

        if (prerequisiteCourseResult.grade === 'f') {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: `Not qualified to register ${course.title} (${course.code}) unless you have passed ${prerequisiteCourse.title} (${prerequisiteCourse.code})`,
          };
        }
      }

      const registeredCourse = await this.registeredCourseModel.create({
        user_id: userId,
        course_id: course.id,
      });

      if (!registeredCourse) {
        return {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Failed to register course',
        };
      } else {
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Success',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error registering course',
        error,
      };
    }
  }

  async findRegistered(query: any) {
    try {
      const courses = await this.registeredCourseModel.find(query).populate('course_id', 'code title credit_unit status');

      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data: {
          courses,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error finding registered course',
        error,
      };
    }
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
