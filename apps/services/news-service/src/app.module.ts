import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { New } from './news/entities/news.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'superapp',
      entities: [New],
      synchronize: true,
    }),

    NewsModule,
    CacheModule.register({ ttl: 30 * 60 * 1000, isGlobal: true }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'test',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule { }
