import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from 'src/course/dto/create-course.dto';
import { Course } from 'src/course/schemas/course.schema';
import { User } from 'src/users/schemas/user.schema';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './schemas/result.schema';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result.name) private resultModel: Model<Result>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  async create(createResultDto: CreateResultDto) {
    try {
      const user = await this.userModel.findById(createResultDto.user_id);
      const course = await this.courseModel.findById(createResultDto.course_id);

      if (!course || !user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Invalid user/course Id',
        };
      }

      const result = await this.resultModel.findOne({
        user_id: createResultDto.user_id,
        course_id: createResultDto.course_id,
      });

      if (result) {
        const updatedResult = await result.updateOne(
          { ...createResultDto },
          { new: true },
        );

        if (updatedResult) {
          return {
            statusCode: HttpStatus.OK,
            message: `Update result for ${course.title} (${course.code}) successful`,
          };
        } else {
          return {
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: `Failed to update result for ${course.title} (${course.code})`,
          };
        }
      }

      const newResult = await this.resultModel.create({
        ...createResultDto,
      });

      if (newResult) {
        return {
          statusCode: HttpStatus.CREATED,
          message: `Create result for ${course.title} (${course.code}) successful`,
        };
      } else {
        return {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `Failed to create result for  ${course.title} (${course.code})`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating result',
        error,
      };
    }
  }

  async findAll() {
    try {
      const results = await this.resultModel.find();

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: {
          results,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error finding all results',
        error,
      };
    }
  }

  async findByQuery(query: any) {
    try {
      const results = await this.resultModel.find(query).populate('course_id', 'title code');

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: {
          results,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error finding results',
        error,
      };
    }
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
