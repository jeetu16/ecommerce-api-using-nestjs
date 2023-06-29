import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/typeorm/Cart";
import { Product } from "src/typeorm/Product";
import { User } from "src/typeorm/User";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";



@Module({
    imports: [TypeOrmModule.forFeature([User,Product,Cart])],
    controllers: [CartController],
    providers: [CartService]
})
export class CartModule {

}