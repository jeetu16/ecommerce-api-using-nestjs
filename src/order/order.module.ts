import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/typeorm/Order";
import { User } from "src/typeorm/User";
import { OrderContorller } from "./order.contorller";
import { OrderService } from "./order.service";
import { Product } from "src/typeorm/Product";



@Module({
    imports: [TypeOrmModule.forFeature([User,Order,Product])],
    controllers: [OrderContorller],
    providers: [OrderService]
})
export class OrderModule {

}