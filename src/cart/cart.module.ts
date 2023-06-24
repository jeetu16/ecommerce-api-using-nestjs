import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/typeorm/Cart";
import { Product } from "src/typeorm/Product";
import { User } from "src/typeorm/User";



@Module({
    imports: [TypeOrmModule.forFeature([Cart,User,Product])],
    controllers: [],
    providers: []
})
export class CartModule {}