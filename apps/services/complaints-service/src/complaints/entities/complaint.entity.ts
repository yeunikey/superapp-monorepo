import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';
import { ComplaintStatus } from './status.enum';

@Entity()
export class Complaint {

    @PrimaryGeneratedColumn('uuid')
    uniqueId: string;

    @ManyToOne(() => Category, (category) => category.complaints, { eager: true })
    category: Category;

    @Column({
        type: "enum",
        enum: ComplaintStatus,
        default: ComplaintStatus.PENDING
    })
    status: ComplaintStatus;

    @Column()
    sender: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column("text", { array: true })
    images: string[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @Column({ default: false })
    resolved: boolean;

    @Column({ type: "timestamp", nullable: true })
    resolvedAt: Date | null;

    @Column({ nullable: true })
    resolver: string | null;

}