import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/User";
import { Order } from "src/typeorm/Order";

@Module({
    imports: [TypeOrmModule.forFeature([User,Order])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {
}