import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response, response } from "express";



@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    private logger = new Logger();

    use(req: Request, res: Response, next: NextFunction) {
        const { ip, method, originalUrl, hostname } = req;
        const userAgent = req.get('user-agent') || '';

        res.on('finish', () => {
            const { statusCode } = res;


            this.logger.log(`\n\nMethod: '${method}',\nHostname: '${hostname}',\nTarget Route: '${originalUrl}',\nStatus Code: '${statusCode}',\nUser Agent: '${userAgent}',\nIp Address: '${ip}'`);

            if(method!=='GET') {
                this.logger.log(req.body);
            }
        });

        next();
    }
}