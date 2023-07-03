import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { AuthGuard } from "src/guards/AuthGuard";
import { OrderService } from "src/order/order.service";
import { CreateOrderDto } from "./dto/Create.Order.dto";
import { RoleBasedGuard } from "src/guards/RoleBasedGuard";
import { UpdateOrderStatusDto } from "./dto/Update.OrderStatus.dto";



@Controller('order')
@ApiTags('order')
@ApiBearerAuth('token')
@UseGuards(AuthGuard)
export class OrderContorller {
    constructor(private orderService : OrderService) {}

    @Post('place_order/')
    @ApiOperation({summary: "This api is used for place order."})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                address: {
                    type: 'string',
                    example: "Near Central Library, Sarkanda, Bilaspur, C.G.",
                    description: "Delivery Address of Customer"
                }
            }
        }
    })
    placeOrder(
        @Body() createOrderDto: CreateOrderDto, 
        @Req() req: Request
    ) {
        return this.orderService.placeOrder(createOrderDto,req);
    }

    @Get('order_details/:order_id')
    @ApiOperation({summary: "This api is used for getting a specific order details."})
    getOrderDetails(@Param('order_id', ParseIntPipe) order_id: number) {
        return this.orderService.getOrderDetails(order_id);
    }

    @Get('get_all_orders')
    @UseGuards(RoleBasedGuard)
    @ApiOperation({summary: "This api is used for getting all the orders. This api can only be accessed by admin"})
    getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @Post('update_order/:order_id')
    @UseGuards(RoleBasedGuard)
    @ApiOperation({ summary: "This api is used for changing the order status." })
    updateOrderStatus( 
        @Param('order_id', ParseIntPipe) order_id: number,
        @Body() updateOrderStatusDto : UpdateOrderStatusDto
        ) {
        return this.orderService.updateOrderStatus(order_id, updateOrderStatusDto);
    }

    @Get("customer_orders")
    @ApiOperation({ summary: "This api is used for getting all the orders of specific customer." })
    allOrderOfCustomer(@Req() req: Request) {
        return this.orderService.allOrderOfCustomer(req)
    }



}