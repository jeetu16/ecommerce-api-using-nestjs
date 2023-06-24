import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({name: 'category'})
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        nullable:false,
        default: ""
    })
    category_name: string 
}