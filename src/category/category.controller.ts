import { Controller, Post, Delete, Body, Param, ParseIntPipe, Get, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AddCategoryDto } from "./dto/Add.Category.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/AuthGuard";
import { RoleBasedGuard } from "src/guards/RoleBasedGuard";


@ApiTags('category')
@ApiBearerAuth('token')
@UseGuards(AuthGuard)
@UseGuards(RoleBasedGuard)
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

    @Delete("/:id")
    deleteCategory(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.deleteCategory(id);
    }
}