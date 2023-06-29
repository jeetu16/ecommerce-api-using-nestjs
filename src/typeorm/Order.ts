import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";


@Entity({name: "orders"})
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number;

    @Column()
    order_date: Date;

    @ManyToOne(type => User, user => user.orders)
    @JoinColumn()
    user: User;

    @Column()
    order_status: string

    @Column()
    total_amount: number

    // @OneToMany(() => Product)
    // @JoinColumn()
    // products : Product
}