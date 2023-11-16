import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get(':userId/records')
  findUserResults(@Param('userId') userId: string) {
    return this.resultService.findByQuery({ user_id: userId });
  }

  @Get()
  findAll() {
    return this.resultService.findAll();
  }

  @Get(':resultId')
  findOne(@Param('resultId') id: string) {
    return this.resultService.findByQuery({ _id: id });
  }

  // @Patch( ':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultService.update(+id, updateResultDto);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultService.remove(+id);
  }
}
