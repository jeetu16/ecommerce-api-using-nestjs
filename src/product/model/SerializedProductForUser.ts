import { Exclude } from "class-transformer"
import { Category } from "src/typeorm/Category";

export class SerializedProductForUser {
    product_id: number
    product_name: string
    price:number
    category: Category;
    photos: string[];

    @Exclude()
    stock: number

    @Exclude()
    sold: number
} 