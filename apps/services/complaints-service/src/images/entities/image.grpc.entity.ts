import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";

interface ImageServiceGrpc {

    DeleteImage(
        data: { id: string },
        metadata?: Metadata
    ): Observable<{ statusCode: number }>;
}

export {
    ImageServiceGrpc
}