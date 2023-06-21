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
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    // .addApiKey({type: 'apiKey', name: 'Authorization', in: 'headers'})
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
