import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, './../../../../.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.COMPLAINTS_SERVICE_PORT ?? 4005);
}
bootstrap();
