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

      const result = await this.resultModel.find({
        user_id: createResultDto.user_id,
        course_id: createResultDto.course_id,
      });

      if (result) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Result already exist. Cannot create duplicate'
        }
      }

      const newResult = await this.resultModel.create({
        ...createResultDto,
      });

      if (newResult) {
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Success',
        };
      } else {
        return {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Failed to create result',
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
      const results = await this.resultModel.find(query);

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
