import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { User } from "src/user/entities/user.entity";

@Entity("groups")
export class Group {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, (user) => user.group)
    users: User[];

}