import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/Create.User.dto";
import { LoginUserDto } from "./dto/Login.User.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";


@ApiTags('auth')
@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({summary:"This api is used for register new customer"})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                firstName: {
                    type: 'string',
                    example: "John",
                    description: "First name of user"
                },
                lastName: {
                    type: 'string',
                    example: "Doe",
                    description: "Last name of user"
                },
                email: {
                    type: 'string',
                    example: "johndoe@gmail.com",
                    description: "email address of user"
                },
                password: {
                    type: 'string',
                    example: "johndoe",
                    description: "password of user"
                }
            }
        }
    })

    @ApiResponse({
        status: 201,
        description: "Successfully Created User",
    })
    @ApiResponse({
        status: 409,
        description: "User already exists",
    })
    @ApiResponse({
        status: 500,
        description: "Internal Server Error"
    })

    @Post("/register")
    registerUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.registerUser(createUserDto);
    }


    @ApiOperation({summary:"This api is used for logged in the user"})
    @ApiBody({
        schema: {
            type:'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'johndoe@gmail.com',
                    description: "email address of user"
                },
                password: {
                    type: 'string',
                    example: "johndoe",
                    description: "password of user"
                }
            }
        }
    })
    @ApiResponse({
        status:201,
        description: "Successfully Logged In"
    })
    @ApiResponse({
        status: 404,
        description: "Not found any user"
    })
    @ApiResponse({
        status: 401,
        description: "Unauthorized Access"
    })
    @Post("/login")
    loginUser(@Body() loginUserDto: LoginUserDto, req: Request) {
        return this.authService.loginUser(loginUserDto, req)
    }
} 