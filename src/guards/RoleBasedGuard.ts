import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";



@Injectable()
export class RoleBasedGuard implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {

            const req = context.switchToHttp().getRequest();
            if(req.user.role !== "ADMIN") {       
                throw new HttpException("Don't have permission to do this", HttpStatus.FORBIDDEN)
            }

            return true

        } catch(error) {
            throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        
    } 
}