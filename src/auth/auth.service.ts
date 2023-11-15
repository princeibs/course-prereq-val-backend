import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { configs } from 'src/configs';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userModel.findOne({
        $or: [
          { email: loginDto.email_or_matric },
          { matric_number: loginDto.email_or_matric },
        ],
      });

      if (!user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Invalid email or matric number',
        };
      }

      const passwordCorrect = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!passwordCorrect) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Incorrect password',
        };
      }

      const tokenPayload = {
        id: user.id,
        role: user.role,
      };

      const jwtToken = await jwt.sign(tokenPayload, configs.APPLICATION_KEY, {
        expiresIn: '7d',
      });

      return {
        statusCode: HttpStatus.OK,
        message: "Success",
        data: {
          token: jwtToken,
          role: user.role,
        }
      }

    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error while trying to login',
        error,
      };
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(userId: string) {

  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
