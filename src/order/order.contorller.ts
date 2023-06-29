import { Controller, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { AuthGuard } from "src/guards/AuthGuard";
import { OrderService } from "src/order/order.service";



@Controller('order')
@ApiTags('order')
@ApiBearerAuth('token')
@UseGuards(AuthGuard)
export class OrderContorller {
    constructor(private orderService : OrderService) {}

    @Post('place_order/:1')
    placeOrder(@Param('product_id', ParseIntPipe) product_id: number, @Req() req: Request) {
        return this.orderService.placeOrder(product_id, req);
    }
}