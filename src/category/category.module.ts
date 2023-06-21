import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/typeorm/Category';
import { RoleBasedMiddleware } from 'src/middlewares/roleBased.middleware';
import { AuthUserMiddleware } from 'src/middlewares/auth.middleware';
import { User } from 'src/typeorm/User';

@Module({
    imports: [TypeOrmModule.forFeature([User,Category])],
    controllers: [CategoryController],
    providers: [CategoryService]
})

export class CategoryModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthUserMiddleware,RoleBasedMiddleware)
            .forRoutes(
                {
                    path: "/category/add",
                    method: RequestMethod.POST
                },
                {
                    path: "/category/delete/:id",
                    method: RequestMethod.DELETE
                },
                {
                    path: "/category",
                    method: RequestMethod.GET
                }
        )

    }
}