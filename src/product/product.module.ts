import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/typeorm/Product";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { User } from "src/typeorm/User";



@Module({
    imports: [TypeOrmModule.forFeature([Product,User])],
    controllers:[ProductController],
    providers:[ProductService]
})
export class ProductModule{}

