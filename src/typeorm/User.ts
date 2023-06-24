import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Cart } from './Cart';

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id : number;

    @Column({
        nullable:false,
        default:""
    })
    firstName: string;

    @Column()
    lastName: string

    @Column()
    DOB:string

    @Column()
    gender: string

    @Column({
        nullable: false,
        default: ""
    })
    email: string

    @Column({
        nullable:false,
        default: "CUSTOMER"
    })
    role: string


    @Column({
        nullable: false,
        default: ""
    })
    password: string
    
    @Column({
        length: 10, 
        unique:true
    })
    mobile: string;

    @Column()
    address: string;

    @OneToOne( type => Cart, cart=>cart.id)
    cart: Cart ;

}

