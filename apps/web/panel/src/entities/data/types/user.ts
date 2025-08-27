import { Group } from "./group";
import { Role } from "./role";

type User = {
    id: number;
    barcode: string;

    name: string;
    surname: string;

    imageId: string;
    group: Group;

    scores: number;
    role: Role
};

export type {
    User
}
