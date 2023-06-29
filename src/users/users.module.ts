import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/User";
import { Order } from "src/typeorm/Order";
import { Cart } from "src/typeorm/Cart";

@Module({
    imports: [TypeOrmModule.forFeature([User,Order,Cart])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {
}