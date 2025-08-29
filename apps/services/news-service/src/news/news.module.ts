import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { New } from "./entities/news.entity";
import { NewController } from "./news.controller";
import { NewService } from "./news.service";
import { UserClient } from "src/users/user.client";
import { ImageClient } from "src/images/image.client";

@Module({
  controllers: [
    NewController
  ],
  providers: [
    NewService,
    UserClient, ImageClient
  ],
  imports: [
    TypeOrmModule.forFeature([New])
  ],
  exports: [NewService, TypeOrmModule],
})

export class NewsModule { }
