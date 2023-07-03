import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";


export type order_status = "Ordered" | "Dispatched" | "Delivered" | "Rejected" | "Cancelled" 

@Entity({name: "orders"})
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number;

    @Column()
    order_date: Date;

    @ManyToOne(type => User, user => user.orders)
    @JoinColumn()
    user: User;

    @Column({
        type: "enum",
        enum: ["Ordered", "Dispatched", "Delivered", "Rejected", "Cancelled"],
        default: ["Ordered"]
    })
    order_status: order_status[]
    @Column()
    total_amount: number

    @OneToMany(() => Product, (product) => product.order)
    @JoinColumn()
    products : Product[]

    @Column()
    address: string

}