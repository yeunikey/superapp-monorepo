import { Group } from "~/entities/student/types/group";
import { Role } from "./role";

type Student = {
    id: number;
    barcode: string;

    name: string;
    surname: string;

    image: string;
    group: Group;

    score: number;
    role: Role
};

export {
    Student
}
