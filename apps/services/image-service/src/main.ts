import { join, resolve } from 'path';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config({ path: resolve(__dirname, './../../../../.env') });
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: ['images'],
      protoPath: [join(__dirname, './../../../libs/proto/images.proto')],
      url: `0.0.0.0:${process.env.IMAGE_SERVICE_GRPC_PORT ?? 5003}`,
    },
  });

  await app.startAllMicroservices(); // старт gRPC
  await app.listen(process.env.IMAGE_SERVICE_PORT ?? 4003); // старт HTTP
}
bootstrap();
