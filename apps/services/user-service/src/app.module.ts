import { CacheModule } from '@nestjs/cache-manager';
import { Group } from './groups/entities/group.entity';
import { GroupModule } from './groups/group.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { Role } from './roles/entities/role.entity';
import { RoleModule } from './roles/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { jwtConstants } from './guard/constants';

@Module({
  imports: [

    GroupModule,
    UserModule,
    RoleModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'superapp',
      entities: [User, Group, Role],
      synchronize: true,
    }),

    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),

    CacheModule.register({ ttl: 30 * 60 * 1000, isGlobal: true })

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
