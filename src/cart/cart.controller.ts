import { Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/AuthGuard";
import { CartService } from "./cart.service";
import { RoleBasedGuard } from "src/guards/RoleBasedGuard";



@Controller('cart')
@ApiTags('cart')
@ApiBearerAuth('token')
@UseGuards(AuthGuard)
export class CartController {
    constructor(private cartService : CartService) {}


    @Get()
    @ApiOperation({ summary: "This api is used for getting all users cart information. It can only be accessed by admin" })
    @UseGuards(RoleBasedGuard)
    getAllUsersCart() {
        return this.cartService.getAllUsersCart();
    }


    @Post('add_to_cart/:product_id')
    @ApiOperation({ summary: "This api is used for adding the product into user cart." })
    addToCart(@Param('product_id', ParseIntPipe) product_id: number, @Req() req: Request) {
        return this.cartService.addToCart(product_id, req);
    }

    @Delete('delete_from_cart/:product_id')
    @ApiOperation({ summary: "This api is used for removing the product from cart." })
    deleteFromCart(@Param('product_id', ParseIntPipe) product_id: number, @Req() req: Request) {
        return this.cartService.deleteFromCart(product_id, req);
    }

}