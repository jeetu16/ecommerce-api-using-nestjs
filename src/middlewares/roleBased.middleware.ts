import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Category } from 'src/typeorm/Category';
import { Repository } from 'typeorm';


@Injectable()
export class RoleBasedMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {

        if(req['user'].role !== "ADMIN") {       
            throw new HttpException("Don't have permission to do this", HttpStatus.FORBIDDEN)
        }
        next();
    }
}