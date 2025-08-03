import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserGrpcController } from "./user.grpc.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController, UserGrpcController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
})

export class UserModule { }
