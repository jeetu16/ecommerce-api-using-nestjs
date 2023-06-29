import { Injectable, HttpException, HttpStatus,  } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/typeorm/Category";
import { Repository } from "typeorm";
import { AddCategoryDto } from "./dto/Add.Category.dto";


@Injectable()
export class CategoryService {
       constructor(@InjectRepository(Category)  private readonly categoryRepository: Repository<Category>) {}


       async addCategory(addCategoryDto: AddCategoryDto) {

            const categoryName = addCategoryDto.category_name; 

            const category = await this.categoryRepository.findOne({ where: { category_name: categoryName } })

            if(category) {
                throw new HttpException("Category already exist", HttpStatus.CONFLICT);
            }

            const newCategory = this.categoryRepository.create({...addCategoryDto})
            
            await this.categoryRepository.save(newCategory);

            return {
                message: "Category Successfully Created",
                newCategory
            }
       }

       async deleteCategory(id : number) {
            if (!id) {
                throw new HttpException("Please Provide id", HttpStatus.BAD_REQUEST)
            }
            const category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) {
                throw new HttpException("Not found any category", HttpStatus.NOT_FOUND);
            }
            await this.categoryRepository.delete(id);
            return {
                message: "Successfully deleted",
                category
            }
       }

       async getAllCategory() {
        const categories = await this.categoryRepository.find({ relations: ['products'] })

        return categories;
       }
}

