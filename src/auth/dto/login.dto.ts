import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @Transform((params) => params.value?.toLowerCase().trim())
    email_or_matric: string

    @IsString()
    @IsNotEmpty()
    password: string
}