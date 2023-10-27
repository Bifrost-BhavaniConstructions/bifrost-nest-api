import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
