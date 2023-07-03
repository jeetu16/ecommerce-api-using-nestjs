import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { order_status } from "src/typeorm/Order";


export class UpdateOrderStatusDto {
    @ApiProperty({
        description:"Provide current order status",
        example:"Ordered"
    })
    @IsNotEmpty()
    order_status: order_status;
}