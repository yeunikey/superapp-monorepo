import { join, resolve } from 'path';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config({ path: resolve(__dirname, './../../../../.env') });
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: ['users'],
      protoPath: [join(__dirname, './../../../libs/proto/users.proto')],
      url: `0.0.0.0:${process.env.USER_SERVICE_GRPC_PORT ?? 5001}`,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // удаляет поля, которых нет в DTO
      forbidNonWhitelisted: true, // (опционально) выбрасывает ошибку, если есть лишние поля
      transform: true          // преобразует типы (например, строку в число)
    })
  );
  app.enableCors();

  await app.startAllMicroservices(); // старт gRPC
  await app.listen(process.env.USER_SERVICE_PORT ?? 4001); // старт HTTP
}
bootstrap();
