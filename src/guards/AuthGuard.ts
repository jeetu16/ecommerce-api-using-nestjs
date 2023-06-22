import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { verify } from "jsonwebtoken";
import { User } from "src/typeorm/User";
import { Repository } from "typeorm";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const req = context.switchToHttp().getRequest();

        let token: string;

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {
            throw new HttpException("No authorized token", HttpStatus.BAD_REQUEST);
        }

        try {
            const decodedJWTPayload = verify(token, process.env.JWT_SECRET);
            const email  = decodedJWTPayload['email'];
            const foundUser =  await this.userRepository.findOne({where : {email}})
            req['user'] = { user_id: foundUser.user_id, email: foundUser.email, role: foundUser.role }
            // console.log(req['user'])

        } catch (error) {
            throw new HttpException("Unauthorized Access", HttpStatus.UNAUTHORIZED);
        }

        return true
    }
}