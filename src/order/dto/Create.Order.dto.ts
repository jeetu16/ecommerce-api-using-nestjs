import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"



export class CreateOrderDto {
    
    @ApiProperty({
        description:"Provide delivery address",
        example:"Chair"
    })
    @IsNotEmpty()
    address: string
}