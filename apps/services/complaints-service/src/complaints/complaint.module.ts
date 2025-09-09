import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserClient } from "src/users/user.client";
import { Complaint } from "./entities/complaint.entity";
import { ComplaintController } from "./complaint.controller";
import { ComplaintService } from "./complaint.service";

@Module({
    controllers: [ComplaintController],
    providers: [UserClient, ComplaintService],
    imports: [
        TypeOrmModule.forFeature([Complaint])
    ],
    exports: [ComplaintService],
})

export class ComplaintModule { }
