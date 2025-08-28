import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NewsModule,

    CacheModule.register({ ttl: 30 * 60 * 1000, isGlobal: true })
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule { }
