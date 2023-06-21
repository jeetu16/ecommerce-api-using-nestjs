import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsNotEmpty, IsString, IsEmail, isNumber, Matches, maxLength, minLength } from "class-validator"

export class CreateUserDto {

    @ApiProperty({
        description: "First name of user",
        example: "John",
    })
    @IsString()
    @IsNotEmpty()
    firstName: string

    @ApiProperty({
        description: "Last name of user",
        example: "Doe",
    })
    @IsString()
    lastName: string

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

    @ApiProperty({
        description:"mobile number of user",
        example: 1234567890
    })
    @IsNotEmpty()
    phone: number
}