import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "src/typeorm/User";
import { Repository } from "typeorm";

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
    async use(req: Request, _res: Response, next: NextFunction) {

        const token = req.headers.authorization

        if (!token) {
            throw new HttpException("No authorized token", HttpStatus.BAD_REQUEST);
        }

        try {
            const decodedJWTPayload = verify(token, process.env.JWT_SECRET);
            const email  = decodedJWTPayload['email'];
            const foundUser =  await this.userRepository.findOne({where : {email}})
            req['user'] = { email: foundUser.email, role: foundUser.role }
            next();

        } catch (error) {
            throw new HttpException("Unauthorized Access", HttpStatus.UNAUTHORIZED);
        }
    }
}


