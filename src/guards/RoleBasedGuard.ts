import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";



@Injectable()
export class RoleBasedGuard implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req = context.switchToHttp().getRequest();

        

        // console.log(req);
        if(req['user'].role !== "ADMIN") {       
            throw new HttpException("Don't have permission to do this", HttpStatus.FORBIDDEN)
        }

        return true
    } 
}