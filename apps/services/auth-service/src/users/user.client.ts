import { Client, ClientGrpc } from '@nestjs/microservices';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { Metadata } from '@grpc/grpc-js';
import { Transport } from '@nestjs/microservices';
import { User } from './entities/user.entity';
import { UserServiceGrpc } from './grpc/users.grpc';
import { firstValueFrom } from 'rxjs';
import { join } from 'path';

@Injectable()
export class UserClient implements OnModuleInit {

    @Client({
        transport: Transport.GRPC,
        options: {
            package: 'users',
            protoPath: join(__dirname, './../../../../libs/proto/users.proto'),
            url: 'localhost:5001',
        },
    })
    private readonly client: ClientGrpc;

    private userService: UserServiceGrpc;

    onModuleInit() {
        this.userService = this.client.getService<UserServiceGrpc>('UserService');
    }

    getMetadata() {
        const metadata = new Metadata();
        metadata.add('token', 'ZvMh[Z7p@fRWF+4,]Qng!TQkV^@{v&Xf=@^|U;U+Hs=6EZ2ZKF');
        return metadata;
    }

    getUserByBarcode(barcode: string) {
        return firstValueFrom(this.userService.GetUserByBarcode({ barcode }, this.getMetadata()));
    }

    saveUser(user: User) {
        return firstValueFrom(this.userService.SaveUser({ user }));
    }

    deleteUser(barcode: string) {
        return firstValueFrom(this.userService.DeleteUser({ barcode }));
    }
}
