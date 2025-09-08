import { Group } from "./entities/group.entity";
import { GroupController } from "./group.controller";
import { GroupService } from "./group.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [TypeOrmModule.forFeature([Group]), UserModule],
  exports: [GroupService],
})

export class GroupModule { }
