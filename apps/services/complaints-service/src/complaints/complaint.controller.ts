import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/guard/auth.guard";
import { UserClient } from "src/users/user.client";
import { ComplaintService } from "./complaint.service";
import { Complaint } from "./entities/complaint.entity";
import { DeepPartial } from "typeorm";
import { AuthRequest } from "src/types";

@Controller("/")
export class ComplaintController {

    constructor(
        private readonly complaintService: ComplaintService,
        private readonly userClient: UserClient,
    ) { }

    @Get("/")
    @UseGuards(AuthGuard)
    async getAll(
        @Req() { user: { barcode } }: AuthRequest,
    ) {

        const { data: currentUser } = await this.userClient.getUserByBarcode(barcode);

        if (!currentUser || !currentUser.role || !["admin", "dev"].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: "Нет прав для удаления",
            };
        }

        const complaints = await this.complaintService.all();

        return {
            statusCode: HttpStatus.OK,
            data: complaints,
        };
    }

    @Get("/my")
    @UseGuards(AuthGuard)
    async getMy(
        @Req() { user: { barcode } }: AuthRequest,
    ) {

        const complaints = await this.complaintService.findByUser(barcode);

        return {
            statusCode: HttpStatus.OK,
            data: complaints,
        };
    }

    @Post()
    @UseGuards(AuthGuard)
    async save(
        @Body() complaint: DeepPartial<Complaint>,
        @Req() { user: { barcode } }: AuthRequest,
    ) {

        const { data: currentUser } = await this.userClient.getUserByBarcode(barcode);

        if (!currentUser) {
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: "Пользователь не найден",
            };
        }

        complaint.sender = currentUser.barcode;

        const saved = await this.complaintService.save(complaint);

        return {
            statusCode: HttpStatus.OK,
            data: saved,
        };
    }

    @Delete("/:id")
    @UseGuards(AuthGuard)
    async delete(
        @Param("id") id: string,
        @Req() { user: { barcode } }: AuthRequest,
    ) {
        const { data: currentUser } = await this.userClient.getUserByBarcode(barcode);
        const complaint = await this.complaintService.find(id);

        if (!currentUser || !currentUser.role || !["admin", "dev"].includes(currentUser.role.key) || (complaint && complaint.sender !== currentUser.barcode)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: "Нет прав для удаления",
            };
        }

        return this.complaintService.delete(id);
    }

}
