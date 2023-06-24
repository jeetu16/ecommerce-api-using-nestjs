import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";


@Entity({ name: 'product' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id: number

    @Column()
    product_name: string

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

    @Column()
    category_id:number
}