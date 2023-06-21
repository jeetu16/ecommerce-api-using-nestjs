import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Entity } from "typeorm";

@Entity()
export class LoginUserDto {

    @ApiProperty({
        description: "email address of user",
        example: "johndoe@gmail.com",
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: "password of user",
        example: "johndoe",
    })
    @IsNotEmpty()
    password: string
}