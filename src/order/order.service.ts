import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/typeorm/Product";
import { User } from "src/typeorm/User";
import { Repository } from "typeorm";
import { Request } from "express";
import { Cart } from "src/typeorm/Cart";
import { Order } from "src/typeorm/Order";
import { CreateOrderDto } from "./dto/Create.Order.dto";
import { UpdateOrderStatusDto } from "./dto/Update.OrderStatus.dto";


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(Order) private orderRepository: Repository<Order>
    ) {}

    async placeOrder(createOrderDto: CreateOrderDto,req: Request) {
        
            const user_id = req['user'].user_id;

            const user = await this.userRepository.findOne({where: {user_id}, relations: ['cart']});

            if(!user) {
                throw new HttpException("Not found any user", HttpStatus.NOT_FOUND);
            }

            if(!user.cart) {
                throw new HttpException("You don't have a cart", HttpStatus.BAD_REQUEST); 
            }

            const cart = await this.cartRepository.findOne({where: {cart_id: user.cart.cart_id}, relations: ['products']})

            if(!cart.products.length) {
                throw new HttpException("Your cart is empty", HttpStatus.BAD_REQUEST);
            }

            let total_cart_amount : number = 0;

            // for (let index = 0; index < cart.products.length; index++) {

            //     total_cart_amount += cart.products[index].price;
                
            // }

            const updateProductStock = Promise.all(
                cart.products.map(async (product) => {
                    const foundProduct = await this.productRepository.findOne({ where: { product_id: product.product_id }});
        
                    // updating product stock  and soldout in database
        
                    foundProduct.stock -= 1;
                    foundProduct.sold += 1;
                    total_cart_amount += foundProduct.price;
                    await this.productRepository.save(foundProduct);
                })
            )



            await updateProductStock;

            const newOrder = new Order()
            newOrder.address = createOrderDto.address;
            newOrder.products = cart.products;
            newOrder.order_date = new Date();
            newOrder.total_amount = total_cart_amount;
            newOrder.user = user;

            user.cart = null;
            await this.userRepository.save(user)

            // const newOrder = this.orderRepository.create({...createOrderDto, products: cart.products, total_amount: total_cart_amount, user: user, order_date: new Date() })

            return await this.orderRepository.save(newOrder);
    }

    async getOrderDetails(order_id:number) {
        const order = await this.orderRepository.findOne({where:{order_id}, relations: ['products']});

        if(!order) {

            throw new HttpException("Not found any order", HttpStatus.NOT_FOUND);

        }

        return order
    }

    async getAllOrders() {

        const orders = await this.orderRepository.find({relations: ['products']});

        return orders
    }

    async updateOrderStatus(order_id: number, updateOrderStatusDto: UpdateOrderStatusDto) {

        const order = await this.orderRepository.findOne({where: {order_id}, relations:['products']});
        
        if(!order) {
            throw new HttpException("Not found any order", HttpStatus.NOT_FOUND);
        }

        order.order_status.push(updateOrderStatusDto.order_status);

        return await this.orderRepository.save(order);
    }

    async allOrderOfCustomer(req: Request) {
       
        const id = req['user'].user_id;

        if(!id) {
            throw new HttpException("Please login", HttpStatus.BAD_REQUEST);
        }

        const user = await this.userRepository.findOne({where: {user_id: id}, relations: ['orders']});
        
        if(!user) {
            throw new HttpException("Not found any user", HttpStatus.NOT_FOUND);
        }

        return user.orders;
    }
}