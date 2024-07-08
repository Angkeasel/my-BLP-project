import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app use global pipes to automaticly validate requests
  app.useGlobalPipes(new ValidationPipe(
    { whitelist: true, transform: true, }
  ));
  // app.enableCors();
  // wrap AppModule with UseContainer
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
