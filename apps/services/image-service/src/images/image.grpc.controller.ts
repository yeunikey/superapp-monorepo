import { Controller, HttpStatus } from "@nestjs/common";

import { GrpcMethod } from "@nestjs/microservices";
import { Metadata } from "@grpc/grpc-js";
import { ImageService } from "./image.service";
import { DeleteGrpcDto } from "./dto/delete.grpc.dto";

@Controller()
export class ImageGrpcController {

    private readonly SECRET_KEY = process.env.GRPC_TOKEN;

    constructor(
        private readonly imageService: ImageService
    ) { }

    private validateToken(metadata: Metadata): boolean {
        const token = metadata.get('token')[0];
        return token === this.SECRET_KEY;
    }

    @GrpcMethod('ImageService', 'DeleteImage')
    async deleteImage(data: DeleteGrpcDto, metadata: Metadata) {

        if (!this.validateToken(metadata)) {
            return { statusCode: HttpStatus.UNAUTHORIZED };
        }

        await this.imageService.delete(data.id);

        return { statusCode: HttpStatus.OK };
    }

}
