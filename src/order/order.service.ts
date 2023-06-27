import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/typeorm/Product";
import { User } from "src/typeorm/User";
import { Repository } from "typeorm";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { SerializedProduct } from "./model/SerializedProduct";


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async addToCart(product_id: number, req : Request) {
        try {

        const product = await this.productRepository.findOne({ where: { product_id } })
        
        if(!product) {
            throw new NotFoundException("Not found Any product")
        }
        
        const id = req['user'].user_id;
        
        const user = await this.userRepository.findOne({ where:{user_id: id}})
        
        user.cart.push(product_id);

        await this.userRepository.save(user);

        return {
            message:"Successfully added into cart",
            product : plainToClass(SerializedProduct, product)
        }

    } catch (error) {
        throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    }

    }

    // async placeOrder(product_id: number, req: Request) {
    //     try {
    //         const user_id = req['user'].user_id
    //     } catch (error) {
    //         throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    //     }
    // }
}