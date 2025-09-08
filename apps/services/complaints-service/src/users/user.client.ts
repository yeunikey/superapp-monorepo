import { Client, ClientGrpc, ClientProxyFactory } from '@nestjs/microservices';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { Metadata } from '@grpc/grpc-js';
import { Transport } from '@nestjs/microservices';
import { User } from './entities/user.entity';
import { UserServiceGrpc } from './grpc/users.grpc';
import { firstValueFrom } from 'rxjs';
import { join } from 'path';

@Injectable()
export class UserClient implements OnModuleInit {

    private client: ClientGrpc;
    private userService: UserServiceGrpc;

    onModuleInit() {
        const host = process.env.HOST || 'localhost';
        const url = `${host}:5001`;

        this.client = ClientProxyFactory.create({
            transport: Transport.GRPC,
            options: {
                package: 'users',
                protoPath: join(__dirname, './../../../../libs/proto/users.proto'),
                url,
            },
        }) as ClientGrpc;

        this.userService = this.client.getService<UserServiceGrpc>('UserService');
        console.log(`✅ gRPC client connected to: ${url}`);
    }

    getMetadata() {
        const metadata = new Metadata();
        metadata.add('token', process.env.GRPC_TOKEN ?? '');
        return metadata;
    }

    getUserByBarcode(barcode: string) {
        return firstValueFrom(this.userService.GetUserByBarcode({ barcode }, this.getMetadata()));
    }

    saveUser(user: User) {
        return firstValueFrom(this.userService.SaveUser({ user }, this.getMetadata()));
    }

    deleteUser(barcode: string) {
        return firstValueFrom(this.userService.DeleteUser({ barcode }, this.getMetadata()));
    }
}
