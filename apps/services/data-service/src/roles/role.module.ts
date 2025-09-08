import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { UserModule } from "src/user/user.module";

@Module({
  controllers: [],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([Role]),
    UserModule
  ],
  exports: [RoleService],
})

export class RoleModule { }
