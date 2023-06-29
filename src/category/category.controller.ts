import { Controller, Post, Delete, Body, Param, ParseIntPipe, Get, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AddCategoryDto } from "./dto/Add.Category.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/AuthGuard";
import { RoleBasedGuard } from "src/guards/RoleBasedGuard";


@ApiTags('category')
@ApiBearerAuth('token')
@UseGuards(AuthGuard)
@Controller("/category")
export class CategoryController {
    
    constructor(private categoryService : CategoryService) {}
    
    @Post("/add")
    @UseGuards(RoleBasedGuard)
    @ApiOperation({summary: "This api is used for creating category of products. This api can only be accessed by admin"})
    addCategory(@Body() addCategoryDto : AddCategoryDto) {
        return this.categoryService.addCategory(addCategoryDto);
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