import { Controller, Post, Delete, Body, Param, ParseIntPipe, Get, UseGuards, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AddCategoryDto } from "./dto/Add.Category.dto";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/AuthGuard";
import { RoleBasedGuard } from "src/guards/RoleBasedGuard";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ParseFile } from "src/product/parse.file.pipe";


@ApiTags('category')
@ApiBearerAuth('token')
@UseGuards(AuthGuard)
@Controller("/category")
export class CategoryController {
    
    constructor(private categoryService : CategoryService) {}
    
    @Post("/add")
    @UseGuards(RoleBasedGuard)
    @UseInterceptors(FilesInterceptor('photos'))
    @ApiOperation({summary: "This api is used for creating category of products. This api can only be accessed by admin"})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                category_name: {
                    type: "string",
                    example: 'Accessories',
                    description: "Name of the category"
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
    addCategory(
        @Body() addCategoryDto : AddCategoryDto,
        @UploadedFile(ParseFile) category_photo: Array<Express.Multer.File>
    ) {
        return this.categoryService.addCategory(addCategoryDto, category_photo);
    }

    @Get()
    @ApiOperation({summary: "This api is used for getting all the category of products."})
    getAllCategory() {
        return this.categoryService.getAllCategory();
    }

    @Delete("/:id")
    @ApiOperation({summary: "This api is used for deleting the category of products"})
    deleteCategory(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.deleteCategory(id);
    }
}