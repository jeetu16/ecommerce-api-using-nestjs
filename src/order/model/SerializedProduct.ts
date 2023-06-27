import { Exclude } from "class-transformer"

export class SerializedProduct {
    
    product_id: number
    product_name: string
    product_description: string
    price:number

    @Exclude()
    stock: number

    @Exclude()
    sold:number

    category_id: number;
}