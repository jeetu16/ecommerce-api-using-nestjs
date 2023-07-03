import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Cart } from "src/typeorm/Cart";
import { Product } from "src/typeorm/Product";
import { User } from "src/typeorm/User";
import { Repository } from "typeorm";
import { SerializedProduct } from "./model/SerializedProduct";



@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Cart) private cartRepository: Repository<Cart>
    ) {}

    async addToCart(product_id: number, req : Request) {
        try {
            const product = await this.productRepository.findOne({ where: { product_id } })
            if(!product) {
                throw new NotFoundException("Not found Any product")
            }
            
            const id = req['user'].user_id;

            let updatedCart;

            const user = await this.userRepository.findOne({ where: { "user_id": id }, relations: ['cart'] });
            
            if(!user.cart) {
                let newCart = new Cart();
                newCart.user= user;
                newCart.products.push(product);

                return await this.cartRepository.save(newCart);
            } else {
                const cart = await this.cartRepository.findOne({ where: { "cart_id": user.cart.cart_id }, relations: ['products', 'user'] });
                cart.products.push(product);
                updatedCart = await this.cartRepository.save(cart);
            }

            return updatedCart

        } catch (error) {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
        }

    }

    async deleteFromCart(product_id : number, req: Request) {

        const product = await this.productRepository.findOne({ where: { product_id } })
        if(!product) {
            throw new NotFoundException("Not found Any product")
        }

        const id = req['user'].user_id;


        const user = await this.userRepository.findOne({where: {user_id: id}, relations: ['cart'], select: ['user_id', "firstName", "lastName", "email"]})


        let findCart = await this.cartRepository.findOne({ where: { cart_id: user.cart.cart_id }, relations: ['products']})

        let deleted_id : number;

        for (deleted_id = 0; deleted_id < findCart.products.length; deleted_id++) {
            if(findCart.products[deleted_id].product_id === product_id) {
                break;
            }
        } 

        if(deleted_id > -1 && deleted_id < findCart.products.length)
            findCart.products.splice(deleted_id,1) ;    
        else 
            throw new NotFoundException('Product does not exist in cart') ;

        return await this.cartRepository.save(findCart);

    }

    async getAllUsersCart() {

        const carts = await this.cartRepository.find({relations: ['user', 'products' ]})
        return carts
        
    }

}