import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";
import { User } from "../entities/user.entity";

interface UserServiceGrpc {

    GetUserByBarcode(
        data: { barcode: string },
        metadata?: Metadata
    ): Observable<{ statusCode: number; data: User }>;

    SaveUser(
        data: { user: User },
        metadata?: Metadata
    ): Observable<{ statusCode: number }>;

    DeleteUser(
        data: { barcode: string },
        metadata?: Metadata
    ): Observable<{ statusCode: number }>;
}

export {
    UserServiceGrpc
}