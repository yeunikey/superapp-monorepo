import { Controller, HttpStatus, Inject } from "@nestjs/common";

import { BarcodeGrpcDto } from "../dto/barcode.grpc.dto";
import { DeepPartial } from "typeorm";
import { GrpcMethod } from "@nestjs/microservices";
import { Metadata } from "@grpc/grpc-js";
import { SaveUserGrpcDto } from "../dto/saveUser.grpc.dto";
import { User } from "../entities/user.entity";
import { UserService } from "../user.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Controller()
export class UserGrpcController {

    private readonly SECRET_KEY = process.env.GRPC_TOKEN;

    constructor(
        private readonly userService: UserService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) { }

    private validateToken(metadata: Metadata): boolean {
        const token = metadata.get('token')[0];
        return token === this.SECRET_KEY;
    }

    private mapUserToGrpc(user: DeepPartial<User>) {
        return {
            id: user.id ?? 0,
            barcode: user.barcode ?? '',
            name: user.name ?? '',
            surname: user.surname ?? '',
            scores: user.scores ?? 0,
            imageId: user.imageId ?? '',
            role: user.role ? {
                id: user.role.id ?? 0,
                key: user.role.key ?? '',
                name: user.role.name ?? '',
            } : undefined,
            group: user.group ? {
                id: user.group.id ?? 0,
                name: user.group.name ?? '',
            } : undefined,
        };
    }

    @GrpcMethod('UserService', 'GetUserByBarcode')
    async getUserByBarcode(data: BarcodeGrpcDto, metadata: Metadata) {

        if (!this.validateToken(metadata)) {
            return { statusCode: HttpStatus.UNAUTHORIZED };
        }

        const user = await this.userService.find(data.barcode);

        if (!user) {
            return {
                statusCode: HttpStatus.NOT_FOUND
            }
        }

        return {
            statusCode: HttpStatus.OK,
            data: this.mapUserToGrpc(user)
        };
    }

    @GrpcMethod('UserService', 'SaveUser')
    async saveUser({ user }: SaveUserGrpcDto, metadata: Metadata) {

        if (!this.validateToken(metadata)) {
            return { statusCode: HttpStatus.UNAUTHORIZED };
        }

        const data: DeepPartial<User> = {
            barcode: user.barcode,
            name: user.name,
            surname: user.surname,
            imageId: user.imageId,
            scores: user.scores,
            role: user.role,
            group: user.group,
        };

        await this.userService.save(data);

        await this.cacheManager.del(`user:${user.barcode}`);
        await this.cacheManager.del(`user:all`);

        return { statusCode: HttpStatus.OK };
    }

    @GrpcMethod('UserService', 'DeleteUser')
    async deleteUser(data: BarcodeGrpcDto, metadata: Metadata) {

        if (!this.validateToken(metadata)) {
            return { statusCode: HttpStatus.UNAUTHORIZED };
        }

        await this.userService.delete(data.barcode);

        await this.cacheManager.del(`user:${data.barcode}`);
        await this.cacheManager.del(`user:all`);

        return { statusCode: HttpStatus.OK };
    }

}
