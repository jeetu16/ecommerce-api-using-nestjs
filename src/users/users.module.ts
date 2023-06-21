import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
// import { ValidateUserMiddleware } from "./middlewares/validate-user.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/User";
import { AuthUserMiddleware } from "src/middlewares/auth.middleware";
import { RoleBasedMiddleware } from "src/middlewares/roleBased.middleware";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthUserMiddleware)
            .forRoutes(
                {
                    path: "/users/:id",
                    method: RequestMethod.PATCH
                }
                
            )
        consumer.apply(AuthUserMiddleware,RoleBasedMiddleware)
        .forRoutes(
            {
                path: "/users/",
                method: RequestMethod.GET
            },
            {
                path: "/users/search/:id",
                method: RequestMethod.GET
            },
            {
                path: "/users/:id",
                method: RequestMethod.DELETE
            }
        )
    }
}