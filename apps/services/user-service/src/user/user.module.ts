import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserGrpcController } from "./grpc/user.grpc.controller";
import { UserService } from "./user.service";
import { ImageClient } from "../images/image.client";

@Module({
  controllers: [UserController, UserGrpcController],
  providers: [UserService, ImageClient],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
})

export class UserModule { }
