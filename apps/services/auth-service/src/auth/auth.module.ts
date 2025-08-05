import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mailer/mail.module';
import { Module } from '@nestjs/common';
import { UserClient } from 'src/users/user.client';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserClient
  ],
  imports: [
    MailModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'test',
      signOptions: { expiresIn: '7d' },
    }),
  ]
})
export class AuthModule { }
