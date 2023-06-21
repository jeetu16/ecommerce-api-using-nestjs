import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/Create.User.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/typeorm/User";
import { SerializedUser } from "src/users/model/User";
import { plainToClass } from "class-transformer";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "./dto/Login.User.dto";
import { sign } from 'jsonwebtoken'
import { Request } from "express";


@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async registerUser(userDto: CreateUserDto) {
  
            const email = userDto.email;
            const user = await this.userRepository.findOne({ where: { email } });
            if (user) {
                throw new HttpException("User already exists", HttpStatus.CONFLICT)
            }
            const hash = await bcrypt.hash(userDto.password, 10);

            const newUser = this.userRepository.create({ ...userDto, password: hash});

            await this.userRepository.save(newUser);

            return {
                message: "User Successfully Created",
                user: plainToClass(SerializedUser, newUser)
            }
        
    }

    async loginUser(loginUserDto: LoginUserDto, req: Request) {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new HttpException("Not found any user", HttpStatus.NOT_FOUND);
        } 
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const payload = { email: user.email, user_id: user.user_id, role: user.role }
            const token = sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
            return {
                message: "Successfully Logged In",
                token: token
            }
        } else {
            throw new HttpException("Unauthorized Access", HttpStatus.UNAUTHORIZED)
        }
    }
}