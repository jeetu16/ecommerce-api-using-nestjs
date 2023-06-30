import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/typeorm/Product";
import { Repository } from "typeorm";
import { AddProductDto } from "./dto/Add.Product.dto";
import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { Category } from "src/typeorm/Category";
import { createReadStream, createWriteStream } from "fs";
import * as path from 'path';

export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) {}

    // adding product into db
    async addProduct( addProductDto: AddProductDto, product_photos: Array<Express.Multer.File> ) : Promise<{}> {

        const {category} = addProductDto

        const findCategory = await this.categoryRepository.findOne({where:{id:category}})

        if(!findCategory) {
            throw new NotFoundException("Not found any category");
        }

        const existsProduct = await this.productRepository.findOne({ where: { product_name: addProductDto.product_name } })

        if(existsProduct) {
            throw new HttpException("Product already exists", HttpStatus.CONFLICT)
        }

        // saving photos in server

        const destination = '../../uploads/';

        const filePaths: string[] = [];

        for (const file of product_photos) {
            
            const fileName = file.originalname;

            if (file.buffer) {
                const writeStream = createWriteStream(destination + fileName);
                writeStream.write(file.buffer);
                writeStream.end();

                const filePath = path.join('C:/uploads',destination,fileName);
                filePaths.push(filePath);
            }
        }

        console.log(filePaths);

        const newProduct = this.productRepository.create({ ...addProductDto, category: findCategory, photos: filePaths });

        // await this.productRepository.save(newProduct)

        return {
            message: "Successfully added product",
            newProduct
        }
    }


    // get all products from db
    async getAllProducts() : Promise<Product[]>{
        const products = await this.productRepository.find({ relations: ['category']});

        return products
    }

    // delete specific product by id
    async deleteProduct( product_id: number ) {
        if(!product_id) {
            throw new HttpException("Please provide product id", HttpStatus.BAD_REQUEST)
        }

        const product = await this.productRepository.findOne({where: { product_id }})

        if(!product) {
            throw new HttpException("Not found any product", HttpStatus.NOT_FOUND);
        }

        await this.productRepository.delete(product_id);

        return {
            message: "Successfully deleted product",
            product
        } 
    }

    // get a specific product by id
    async getProduct( product_id: number ) {
        if(!product_id) {
            throw new HttpException("No token received", HttpStatus.BAD_REQUEST);
        }

        const product = await this.productRepository.findOne({ where: { product_id } });

        if(!product) {
            throw new HttpException("Not found any product with given product id", HttpStatus.NOT_FOUND);
        }

        return product;
    }

    // updating product details

    async updateProduct( product_id: number ) {
        
    }


}