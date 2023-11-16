import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { RegisterCourseDto } from './dto/register-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@UseGuards(AuthGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Post('register')
  register(@Body() registerCourseDto: RegisterCourseDto, @Req() req: any) {
    const userId = req.user.id;
    return this.courseService.register(userId, registerCourseDto);
  }

  @Get(':userId/registered')
  findUserRegistered(@Param('userId') userId: string) {
    return this.courseService.findRegistered({ user_id: userId });
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':courseId')
  findOne(@Param('courseId') id: string) {
    return this.courseService.findByQuery({ _id: id });
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
