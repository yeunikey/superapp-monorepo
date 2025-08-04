import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import { resolve } from 'path';

async function bootstrap() {
  dotenv.config({ path: resolve(__dirname, './../../../../.env') });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.AUTH_SERVICE_PORT ?? 4002);
}
bootstrap();
