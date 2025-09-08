import { Category } from "./entities/category.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserClient } from "src/users/user.client";

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, UserClient],
    imports: [
        TypeOrmModule.forFeature([Category])
    ],
    exports: [CategoryService],
})

export class CategoryModule { }
