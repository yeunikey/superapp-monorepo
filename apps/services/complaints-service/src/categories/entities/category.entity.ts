import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Complaint } from 'src/complaints/entities/complaint.entity';

@Entity()
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