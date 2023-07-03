import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/typeorm/Product";
import { Repository } from "typeorm";
import { AddProductDto } from "./dto/Add.Product.dto";
import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { Category } from "src/typeorm/Category";
import { createReadStream, createWriteStream } from "fs";
import * as path from 'path';
import { plainToClass } from "class-transformer";
import { SerializedProductForUser } from "./model/SerializedProductForUser";

export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) {}

    // adding product into db
    async addProduct( addProductDto: AddProductDto, product_photos: Array<Express.Multer.File> )  {

        const {category} = addProductDto

        const findCategory = await this.categoryRepository.findOne({where:{id:category}})

        if(!findCategory) {
            throw new NotFoundException("Not found any category");
        }

        const { price, stock } = addProductDto;

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

        await this.productRepository.save(newProduct)

        return {
            message: "Successfully added product",
            newProduct
        }
    }


    // get all products from db
    async getAllProducts() {
        
        // const products = await this.productRepository.find({ relations: ['category']});
        const products = (await this.productRepository.find()).map(product => plainToClass(SerializedProductForUser, product));

        return products
    }

    async getAllProductsByName(product_name: string) {

        const products = await this.productRepository.find();

        const filteredProducts = products.filter(product => product.product_name.toLowerCase().includes(product_name.toLowerCase()))

        if(filteredProducts.length===0) {
            throw new HttpException("Not found any product", HttpStatus.NOT_FOUND)
        }

        return {
            products : filteredProducts
        }
    }

    // get all products details. This can be accessed by user admin only.
    async getAllProductsDetails() {

        const products = await this.productRepository.find()

        if(!products) {
            throw new HttpException("Not found any product", HttpStatus.NOT_FOUND);
        }

        return products

    }


    //
    async getProductsByCategory(category_id:number) {

        const products = (await this.productRepository.find({ relations: ['category']})).map(product => plainToClass(SerializedProductForUser, product))

        const categorizedProducts = (products.filter(products => products.category.id === category_id)).map(product => {
            delete product.category
            return product
        })

        return categorizedProducts;
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

    // async updateProduct( product_id: number ) {
        
    // }
}