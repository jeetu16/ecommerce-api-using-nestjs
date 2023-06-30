import { IsNotEmpty, IsString } from "class-validator";



export class AddCategoryDto {
    
    @IsString()
    @IsNotEmpty()
    category_name: string
    
}