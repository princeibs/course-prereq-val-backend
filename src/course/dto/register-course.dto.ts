import { IsMongoId, IsNotEmpty } from "class-validator";

export class RegisterCourseDto {
    @IsNotEmpty()
    @IsMongoId()
    course_id: string;
}