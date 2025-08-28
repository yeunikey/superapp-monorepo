import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("news")
export class New {

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