import { IsIn, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateResultDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['100', '200', '300', '400', '500'])
  readonly level: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['first', 'second'])
  readonly semester: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly course_id: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['a', 'b', 'c', 'd', 'e', 'f'])
  readonly grade: string;
}
