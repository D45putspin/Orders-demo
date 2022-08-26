import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV_VARIABLES } from './config/env';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: ENV_VARIABLES.environment === 'development',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser()); // TODO: Read more about `secret`
  await app.listen(3001);
}
bootstrap();
