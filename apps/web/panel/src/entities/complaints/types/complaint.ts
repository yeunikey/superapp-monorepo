import { ComplaintCategory } from "./category";
import { ComplaintStatus } from "./status";

type Complaint = {
    uniqueId: string;
    category: ComplaintCategory | null;
    status: ComplaintStatus;
    sender: string;
    title: string;
    content: string;
    images: string[];
    createdAt: Date;
    resolved: boolean;
    resolvedAt: Date | null;
    resolver: string | null;
}

export type {
    Complaint
}