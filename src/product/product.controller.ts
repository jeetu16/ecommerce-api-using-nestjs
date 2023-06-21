import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AddProductDto } from "./dto/Add.Product.dto";
import { AuthGuard } from "src/guards/AuthGuard";
import { RoleBasedGuard } from "src/guards/RoleBasedGuard";




@ApiTags('product')
@ApiBearerAuth('token')
@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}
    
    @Post("/add")
    @UseGuards(RoleBasedGuard)
    @ApiOperation({ summary: "This api is used for adding the product into database" })
    addProduct(@Body() addProductDto : AddProductDto) {
        return this.productService.addCategory(addProductDto);
    }

}