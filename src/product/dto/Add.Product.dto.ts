import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, Min, min } from "class-validator"


export class AddProductDto {

    @ApiProperty({
        description:"Provide prduct name",
        example:"Chair"
    })
    @IsString()
    @IsNotEmpty()
    product_name: string

    @ApiProperty({
        description:"Provide details about product",
        example:"This is wooden chair."
    })
    @IsString()
    @IsNotEmpty()
    product_description: string

    @ApiProperty({
        description:"Provide price of the product",
        example:"500"
    })
    @IsNumber()
    @IsNotEmpty()
    price:number

    @ApiProperty({
        description:"Provide provide total stock available",
        example:"10"
    })
    @IsNumber()
    stock: number

    @ApiProperty({
        description:"Provide prduct category Id",
        example:5
    })
    @IsNotEmpty()
    category_id:number
    
    

}