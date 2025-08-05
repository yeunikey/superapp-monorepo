import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ImageGrpcController } from './image.grpc.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Image])],
    controllers: [ImageController, ImageGrpcController],
    providers: [ImageService],
    exports: [
        ImageService
    ]
})
export class ImageModule { }