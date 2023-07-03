import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';
import { Category } from './Category';
import { Cart } from './Cart';

@Entity({ name: "users" })
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
    })
    role: string


    @Column({
        nullable: false,
        default: "",
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
    @JoinColumn()
    orders: Order[];

    
    @OneToOne(() => Cart, (cart) => cart.user)
    @JoinColumn()
    cart : Cart

    @Column({
        length: 6
    })
    pincode: string
}

