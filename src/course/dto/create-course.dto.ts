import { Transform } from 'class-transformer';
import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @Transform((params) => params.value?.toLowerCase().replace(/\s/g, ''))
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  // @Transform((params) => params.value?.toLowerCase().trim())
  readonly title: string;

  @IsNumberString()
  @IsNotEmpty()
  readonly credit_units: string;

  @IsString()
  @IsNotEmpty()
  @Transform((params) => params.value?.toLowerCase().trim())
  @IsIn(['core', 'elective', 'general'])
  readonly status: string;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  readonly prerequisite: string;
}
