import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];

}