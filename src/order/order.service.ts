import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/typeorm/Product";
import { User } from "src/typeorm/User";
import { Repository } from "typeorm";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { SerializedProduct } from "../cart/model/SerializedProduct";
import { Cart } from "src/typeorm/Cart";


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Cart) private cartRepository: Repository<Cart>
    ) {}

    async placeOrder(product_id: number, req: Request) {
        try {
            const user_id = req['user'].user_id
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}