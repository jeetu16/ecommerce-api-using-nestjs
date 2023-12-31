import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Cart } from "./Cart";
import { Order } from "./Order";


@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    product_id: number

    @Column()
    product_name: string

    @Column()
    brand_name: string

    @Column()
    product_description: string

    @Column()
    price:number

    @Column({
        default:0
    })
    stock: number

    @Column({
        default:0
    })
    sold:number


    @ManyToOne(type => Category)
    @JoinColumn()
    category: Category;

    @ManyToOne(() => Cart, (cart) => cart.products)
    @JoinColumn()
    cart: Cart; 

    @Column("simple-array")
    photos: string[];

    @ManyToOne(() => Order, (order) => order.products)
    order: Order
}