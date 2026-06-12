/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as constants from "./app/constants/constants"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = constants.PORT;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  )
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
