import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity("categories")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    // @OneToMany(() => Complaint, (complaint) => complaint.category)
    // complaints: Complaint[];

}