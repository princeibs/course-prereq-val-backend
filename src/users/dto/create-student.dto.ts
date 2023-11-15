import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    @Transform((params) => params.value?.toLowerCase().trim())
    readonly matric_number: string

    @IsString()
    @IsNotEmpty()
    readonly full_name: string

    @IsString()
    @IsNotEmpty()
    @Transform((params) => params.value?.toLowerCase().trim())
    readonly email: string

    @IsString()
    @IsNotEmpty()
    readonly password: string

}
