import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './images/entities/image.entity';
import { ImageModule } from './images/image.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'superapp',
      entities: [Image],
      synchronize: true,
    }),

    ImageModule
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule { }
