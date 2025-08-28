import { Module, forwardRef } from "@nestjs/common";

import { GroupModule } from "src/groups/group.module";
import { ImageClient } from "../images/image.client";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/news.entity";
import { UserController } from "./user.controller";
import { UserGrpcController } from "./grpc/user.grpc.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService, ImageClient],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, TypeOrmModule],
})

export class NewsModule { }
