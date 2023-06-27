import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/User';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { Category } from './typeorm/Category';
import { Product } from './typeorm/Product';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { Order } from './typeorm/Order';
import { OrderModule } from './order/order.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST_NAME,
      port: 3306,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: 'testdb',
      autoLoadEntities:true,
      entities: [User, Category, Product, Order],
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ],
})
export class AppModule  implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
