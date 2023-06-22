import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/typeorm/Category';
import { User } from 'src/typeorm/User';

@Module({
    imports: [TypeOrmModule.forFeature([User,Category])],
    controllers: [CategoryController],
    providers: [CategoryService]
})

export class CategoryModule {}