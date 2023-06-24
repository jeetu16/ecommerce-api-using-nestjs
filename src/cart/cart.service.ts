import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/typeorm/Cart";
import { Product } from "src/typeorm/Product";
import { User } from "src/typeorm/User";
import { Repository } from "typeorm";


@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private readonly cartRepository : Repository<Cart>,
        @InjectRepository(User) private readonly userRepository : Repository<User>,
        @InjectRepository(Product) private readonly productRepository : Repository<Product>
    ) {}
}

