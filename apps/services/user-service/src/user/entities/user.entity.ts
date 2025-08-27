import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Group } from "src/groups/entities/group.entity";
import { Role } from "src/roles/entities/role.entity";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    barcode: string;


    @Column()
    name: string;

    @Column()
    surname: string;


    @ManyToOne(() => Group, (group) => group.users, {
        eager: true,
        nullable: true
    })
    group: Group | null;

    @ManyToOne(() => Role, (role) => role.users, {
        eager: true,
        nullable: true
    })
    role: Role;

    @Column({
        default: 0
    })
    scores: number;

    @Column({ type: "varchar", nullable: true })
    imageId: string | null;

}