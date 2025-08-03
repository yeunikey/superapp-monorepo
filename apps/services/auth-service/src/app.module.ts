import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { MailModule } from './mailer/mail.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule,
    MailModule,

    CacheModule.register({ ttl: 30 * 60 * 1000, isGlobal: true })
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule { }
