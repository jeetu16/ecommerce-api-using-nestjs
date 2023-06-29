import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";


@Entity({name:"cart"})
export class Cart{
    @PrimaryGeneratedColumn()
    cart_id: number

    @OneToOne(() => User, (user) => user.cart )
    user : User

    @OneToMany(() => Product, (product) => product.cart)
    @JoinColumn()
    products: Product[]
}