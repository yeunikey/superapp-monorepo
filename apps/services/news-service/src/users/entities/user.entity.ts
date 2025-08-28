import { Group } from "./group.entity";
import { Role } from "./role.entity";

interface User {
    id: number;
    barcode: string;
    name: string;
    surname: string;
    imageId?: string;
    scores: number;
    role?: Role;
    group?: Group;
}

export {
    User
}