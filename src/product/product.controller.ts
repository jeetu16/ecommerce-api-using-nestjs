import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { AddProductDto } from "./dto/Add.Product.dto";
import { AuthGuard } from "src/guards/AuthGuard";
import { RoleBasedGuard } from "src/guards/RoleBasedGuard";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ParseFile } from "./parse.file.pipe";




@UseGuards(AuthGuard)
@ApiTags('product')
@ApiBearerAuth('token')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}
    
    @Post("/add")
    @UseInterceptors(FilesInterceptor('photos'))
    @UseGuards(RoleBasedGuard)
    @ApiConsumes('multipart/form-data')
    // @ApiImplicitFile({ name: 'file', required: true })
    @ApiOperation({ summary: "This api is used for adding the product into database. This api can only be accessed by Admin" })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                product_name: {
                    type: 'string',
                    example: "T-shirt",
                    description: "Name of the product"
                },
                product_description: {
                    type: 'string',
                    example: "This is full sleeve round neck t-shirt",
                    description: "Details about product"
                },
                price: {
                    type: 'number',
                    example: 400,
                    description: "Price of the product"
                },
                stock: {
                    type: 'number',
                    example: 10,
                    description: "total current stock available"
                },
                category: {
                    type: 'number',
                    example: 3,
                    description: "Defines the category of the product"
                },
                photos: {
                    type: 'array', 
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            }
        }
    })
    addProduct(
        @Body() addProductDto : AddProductDto, 
        @UploadedFiles(ParseFile) product_photos: Array<Express.Multer.File>
    ) {
            return this.productService.addProduct(addProductDto, product_photos);
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