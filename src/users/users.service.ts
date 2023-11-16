import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    try {
      const existingStudent = await this.userModel.findOne({
        $or: [
          { email: createStudentDto.email },
          {
            matric_number: createStudentDto.matric_number,
          },
        ],
      });

      if (existingStudent) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Matric Number or Email already exists',
        };
      }

      let hashedPassword = await bcrypt.hash(
        '' + createStudentDto.password,
        10,
      );

      const newStudent = await this.userModel.create({
        ...createStudentDto,
        password: hashedPassword,
        role: 'student',
      });

      if (newStudent) {
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Success',
        };
      } else {
        return {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Failed to create student',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating student',
        error,
      };
    }
  }

  async findByQuery(query: any) {
    try {
      const users = await this.userModel.find(query);

      if (!users) {
        return {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Failed to find users by query',
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: {
          users,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error while trying to find User',
        error,
      };
    }
  }

  async findOne(userId: string) {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Cannot find user',
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: {
          user,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error while trying to find user',
        error,
      };
    }
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
