import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: ['users'],
      protoPath: [join(__dirname, './../../../libs/proto/users.proto')],
      url: `0.0.0.0:${process.env.PORT ?? 5001}`,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // удаляет поля, которых нет в DTO
      forbidNonWhitelisted: true, // (опционально) выбрасывает ошибку, если есть лишние поля
      transform: true          // преобразует типы (например, строку в число)
    })
  );

  await app.startAllMicroservices(); // старт gRPC
  await app.listen(process.env.HTTP_PORT ?? 4001); // старт HTTP
}
bootstrap();
