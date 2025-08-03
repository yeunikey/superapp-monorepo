import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { UserModule } from "src/user/user.module";

@Module({
  controllers: [],
  providers: [GroupService],
  imports: [TypeOrmModule.forFeature([Group]), UserModule],
  exports: [GroupService],
})

export class GroupModule { }
