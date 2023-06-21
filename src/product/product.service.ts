import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/typeorm/Product";
import { Repository } from "typeorm";
import { AddProductDto } from "./dto/Add.Product.dto";


export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

    async addCategory( addProductDto: AddProductDto ) {
        const newProduct = await this.productRepository.create(addProductDto);

        await this.productRepository.save(newProduct)

        return {
            message: "Successfully added product",
            newProduct
        }
    }
}