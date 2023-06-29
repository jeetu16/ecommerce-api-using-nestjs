import { HttpCode, HttpException, HttpStatus, Injectable, Req } from "@nestjs/common";
import { SerializedUser } from "./model/User";
import { plainToClass } from 'class-transformer';
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity } from "src/typeorm/User";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/Update.User.dto";
import { Request } from "express";
import { Cart } from "src/typeorm/Cart";


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>
    ) { }

    // Get all the user details
    async getAllUsers() {
        const users = (await this.userRepository.find({relations: ['cart']})).map(user => plainToClass(SerializedUser, user));
        return users;
    }


    // get specific user details
    async findUserById(user_id: number) {
        const user = await this.userRepository.findOne({ where: { user_id } });
        if (user) return plainToClass(SerializedUser, user)
        else throw new HttpException("Not found any user", HttpStatus.NOT_FOUND)
    }


    // delete user
    async deleteUser(user_id: number) {
        if (!user_id) {
            throw new HttpException("Please provide id", HttpStatus.BAD_REQUEST)
        }
        const user = await this.userRepository.findOne({ where: { user_id } });
        if (!user) {
            throw new HttpException("Not found any user", HttpStatus.NOT_FOUND);
        }
        await this.userRepository.delete(user_id);
        return {
            message: "Successfully deleted",
            user: plainToClass(SerializedUser, user)
        }
    }

    
    // update user
    async updateUser(user_id: number, updateUserDto: UpdateUserDto) {
        if (!user_id) {
            throw new HttpException("Please provide user id", HttpStatus.BAD_REQUEST)
        }
        const user = await this.userRepository.findOne({ where: { user_id } });
        console.log(user)
        if (!user) {
            throw new HttpException("Not found any user", HttpStatus.NOT_FOUND);
        }
        await this.userRepository.update(user_id, updateUserDto);
        const updatedUser = await this.userRepository.findOne({ where: { user_id } });

        return {
            message: "successfully updated user",
            updatedUser: plainToClass(SerializedUser, updatedUser)
        }
    }

    // get cart details
    async getCartDetails(req: Request) {

        const id = req['user'].user_id;

        const user = await this.userRepository.findOne({where: { user_id: id }, relations : ['cart'] });

        console.log(user.cart);
        

        if(!user.cart) {
            return {
                cart: []
            }
        }
        const cart = await this.cartRepository.findOne({where: {cart_id: user.cart.cart_id}, relations: ['products']})


        let total_cart_amount : number = 0;

        for (let index = 0; index < cart.products.length; index++) {
            total_cart_amount += cart.products[index].price;
            console.log(cart.products[index].price)
        }

        return {
            cart: cart.products,
            totalAmount: total_cart_amount
        };         

    }
}