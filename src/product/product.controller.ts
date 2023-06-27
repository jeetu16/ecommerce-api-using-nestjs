import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { AddProductDto } from "./dto/Add.Product.dto";
import { AuthGuard } from "src/guards/AuthGuard";
import { RoleBasedGuard } from "src/guards/RoleBasedGuard";




@UseGuards(AuthGuard)
@ApiTags('product')
@ApiBearerAuth('token')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}
    
    @Post("/add")
    @UseGuards(RoleBasedGuard)
    @ApiOperation({ summary: "This api is used for adding the product into database. This api can only be accessed by Admin" })
    addProduct(@Body() addProductDto : AddProductDto) {
        return this.productService.addProduct(addProductDto);
    }

    @Get()
    @ApiOperation({summary: "This api is used for getting all products information. This api can only be accessed by Admin"})
    getAllProducts() {
        return this.productService.getAllProducts()
    }

    @Get('/:product_id')
    @ApiOperation({ summary: "This api is used for getting a specific product details. This api can only be accessed by Admin" })
    getProduct(@Param('product_id', ParseIntPipe) product_id: number) {
        return this.productService.getProduct(product_id)
    }

    @Delete('/:product_id')
    @UseGuards(AuthGuard)
    @UseGuards(RoleBasedGuard)
    @ApiOperation({ summary: "This api is used for deleting a specific product by id. This api can only be accessed by Admin" })
    deleteProduct(@Param('product_id', ParseIntPipe) product_id: number) {
        return this.productService.deleteProduct(product_id)
    }

    @Patch('/:product_id')
    @UseGuards(AuthGuard)
    @UseGuards(RoleBasedGuard)
    @ApiOperation({ summary: "This api is used for updating the information about product. This api can only be accessed by Admin" }) 
    updateProduct(@Param('product_id', ParseIntPipe) product_id: number) {
        return this.productService.updateProduct(product_id);
    }

    

}