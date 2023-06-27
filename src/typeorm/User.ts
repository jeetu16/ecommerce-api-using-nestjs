import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';
import { Category } from './Category';
import { Cart } from './Cart';

@Entity({ name: "user" })
export class User {

    @PrimaryGeneratedColumn()
    user_id : number;

    @Column({
        nullable:false,
        default:""
    })
    firstName: string;

    @Column()
    lastName: string

    @Column({
        nullable: false,
        default: ""
    })
    email: string

    @Column({
        default: "CUSTOMER",
        select:false
    })
    role: string


    @Column({
        nullable: false,
        default: "",
        select:false
    })
    password: string
    
    @Column({
        length: 10, 
        unique:true
    })
    mobile: string;

    @Column()
    address: string;

    
    @OneToMany(() => Order, order => order.user) 
    orders: Order[];

    
    @OneToMany(() => Cart, (cart) => cart.user)
    @JoinColumn()
    cart : Cart[]

    @Column({
        length: 6
    })
    pincode: string
}

