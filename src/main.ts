import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('Here you can see all the documentation related to Ecommerce APIs. You can also test all these APIs')
    .setVersion('1.0')
    .addBearerAuth(
      { 
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header'
      },
      'token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(4000);
    app.useGlobalPipes(new ValidationPipe());
  } catch (error) {
    console.log(error)
  }
}
bootstrap();
