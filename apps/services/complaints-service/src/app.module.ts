import { CacheModule } from '@nestjs/cache-manager';
import { CategoryModule } from './categories/category.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.register({ ttl: 30 * 60 * 1000, isGlobal: true })
  ],
  controllers: [],
  providers: [
    CategoryModule
  ],
})
export class AppModule { }
