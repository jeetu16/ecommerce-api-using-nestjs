import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";


@Entity('carts')
export class Cart {

    @PrimaryGeneratedColumn('uuid')
    @OneToOne(type => User)
    @JoinColumn({name: "user_id"})
    id: User ;
    
    @ManyToMany(type=>Product, {
        cascade: true, 
    }) 
    @JoinTable()
    products: Product[];

}