import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({name:"cart"})
export class Cart{
    @PrimaryGeneratedColumn()
    cart_id: number

    @ManyToOne(() => User, (user) => user.cart )
    user : User

    @Column({
        type:'simple-json'
    })
    product: JSON

}