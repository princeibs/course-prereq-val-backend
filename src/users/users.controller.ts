import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'node-fetch';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CourseService } from 'src/course/course.service';
import { ResultService } from 'src/result/result.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly courseService: CourseService,
    private readonly resultService: ResultService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':id/courses')
  registeredCourses(@Param('id') userId: string) {
    return this.courseService.findRegistered({user_id: userId})
  }

  @UseGuards(AuthGuard)
  @Get(':id/results')
  results(@Param('id') userId: string) {
    return this.resultService.findByQuery({user_id: userId})
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Req() req: any) {
    const userId = req.user.id
    return this.usersService.findOne(userId)
  }

  // @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.usersService.createStudent(createStudentDto);
  }

  // @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(+id, updateUserDto);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
