import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity("categories")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @OneToMany(() => Complaint, (complaint) => complaint.category)
    complaints: Complaint[];

}