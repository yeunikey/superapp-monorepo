import { Client, ClientGrpc } from '@nestjs/microservices';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { ImageServiceGrpc } from './entities/image.grpc.entity';
import { Metadata } from '@grpc/grpc-js';
import { Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { join } from 'path';

@Injectable()
export class ImageClient implements OnModuleInit {

    @Client({
        transport: Transport.GRPC,
        options: {
            package: 'images',
            protoPath: join(__dirname, './../../../../libs/proto/images.proto'),
            url: `${process.env.HOST}:5001`,
        },
    })
    private readonly client: ClientGrpc;

    private imageService: ImageServiceGrpc;

    onModuleInit() {
        this.imageService = this.client.getService<ImageServiceGrpc>('ImageService');
    }

    getMetadata() {
        const metadata = new Metadata();
        metadata.add('token', process.env.GRPC_TOKEN ?? '');
        return metadata;
    }

    deleteImage(id: string) {
        return firstValueFrom(this.imageService.DeleteImage({ id }, this.getMetadata()));
    }
}
