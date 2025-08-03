import { DeepPartial } from "typeorm";
import { Group } from "src/groups/entities/group.entity";
import { Role } from "src/roles/entities/role.entity";

interface SaveUserGrpcDto {
    user: {
        barcode: string;
        name: string;
        surname: string;
        role: DeepPartial<Role>;
        group: DeepPartial<Group>;
        imageId: string;
        scores: number;
    }
}

export {
    SaveUserGrpcDto
}