import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";



@Entity({name: 'category'})
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable:false,
        default: ""
    })
    category_name: string 

    @OneToMany(type=>Product, product=>product)
    products: Product[];
}
