import { CacheModule } from '@nestjs/cache-manager';
import { CategoryModule } from './categories/category.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    CacheModule.register({ ttl: 30 * 60 * 1000, isGlobal: true }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'test',
      signOptions: { expiresIn: '7d' },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'superapp',
      entities: [Category],
      synchronize: true,
    }),

    CategoryModule
  ],
  controllers: [],
  providers: [

  ],
})
export class AppModule { }
