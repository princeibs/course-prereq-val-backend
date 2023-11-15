import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
    @IsString()
    @IsNotEmpty()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    readonly password: string

}
