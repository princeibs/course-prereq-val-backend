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

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly courseService: CourseService,
    private readonly resultService: ResultService,
  ) {}

  @Get('profile')
  profile(@Req() req: any) {
    const userId = req.user.id
    return this.usersService.findOne(userId)
  }

  // @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.usersService.createStudent(createStudentDto);
  }

  @Get('students')
  findAllStudents() {
    return this.usersService.findByQuery({role: 'student'});
  }

  @Get(':id')
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
