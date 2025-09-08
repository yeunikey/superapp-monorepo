
export interface AuthRequest extends Request {
    user: {
        id: number;
        barcode: string;
        name: string;
        surname: string;
        imageId: string;
    };
}