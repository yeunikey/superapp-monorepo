import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("news")
export class New {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ type: "varchar", nullable: true })
    imageId: string | null;

    @CreateDateColumn({ type: "timestamp" })
    publishedAt: Date;

}