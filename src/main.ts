import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { configs } from './configs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: configs.NODE_ENV === 'production' ? true : false,
      transform: true
    }),
  );

  const options = new DocumentBuilder()
  .setTitle('API docs')
  .setDescription('FYPMS API Documentation')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('docs', app, document);
  await app.listen(configs.PORT);
}
bootstrap();