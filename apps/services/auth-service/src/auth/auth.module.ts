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
      secret: 'ZvMh[Z7p@fRWF+4,]Qng!TQkV^@{v&Xf=@^|U;U+Hs=6EZ2ZKF',
      signOptions: { expiresIn: '7d' },
    }),
  ]
})
export class AuthModule { }
