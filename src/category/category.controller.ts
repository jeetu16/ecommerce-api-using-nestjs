import { Controller, Post, Delete, Body, Param, ParseIntPipe, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AddCategoryDto } from "./dto/Add.Category.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('category')
@Controller("/category")
export class CategoryController {

    constructor(private categoryService : CategoryService) {}

    @Post("/add")
    addCategory(@Body() addCategoryDto : AddCategoryDto) {
        return this.categoryService.addCategory(addCategoryDto);
    }

    @Get()
    getAllCategory() {
        return this.categoryService.getAllCategory();
    }

    @Delete("/delete/:id")
    deleteCategory(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.deleteCategory(id);
    }
}