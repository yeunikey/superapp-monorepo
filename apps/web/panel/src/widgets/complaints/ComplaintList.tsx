"use client";

import { fetchComplaints } from "@/entities/complaints/model/fetchComplaints";
import { useComplaints } from "@/entities/complaints/model/useComplaints";
import { Complaint } from "@/entities/complaints/types/complaint";
import { useAuth } from "@/entities/data/model/useAuth";
import { useComplaintStore } from "@/features/complaints/model/useComplaintStore";
import { useEffect, useMemo } from "react";

function ComplaintList() {
    const { token } = useAuth();
    const { complaints, setComplaints } = useComplaints();
    const { setOpenViewModal, setViewingComplaint } = useComplaintStore();

    useEffect(() => {
        if (!token) return;
        fetchComplaints();
    }, [token, setComplaints]);

    const grouped = useMemo(() => {
        const inProgress = complaints.filter((c) => c.status === "in_progress");
        const pending = complaints.filter((c) => c.status === "pending");
        const resolved = complaints
            .filter((c) => c.status === "resolved")
            .sort((a, b) => {
                const dateA = new Date(a.resolvedAt ?? a.createdAt).getTime();
                const dateB = new Date(b.resolvedAt ?? b.createdAt).getTime();
                return dateB - dateA;
            });

        return { inProgress, pending, resolved };
    }, [complaints]);

    return (
        <div className="flex flex-col gap-6 mt-4">
            {grouped.inProgress.length > 0 && (
                <Section title="В процессе" color="text-blue-600">
                    {grouped.inProgress.map((c) => (
                        <ComplaintCard
                            key={c.uniqueId}
                            complaint={c}
                            onClick={() => {
                                setViewingComplaint(c);
                                setOpenViewModal(true);
                            }}
                        />
                    ))}
                </Section>
            )}

            {grouped.pending.length > 0 && (
                <Section title="Ожидают рассмотрения" color="text-yellow-600">
                    {grouped.pending.map((c) => (
                        <ComplaintCard
                            key={c.uniqueId}
                            complaint={c}
                            onClick={() => {
                                setViewingComplaint(c);
                                setOpenViewModal(true);
                            }}
                        />
                    ))}
                </Section>
            )}

            {grouped.resolved.length > 0 && (
                <Section title="Решённые" color="text-green-600">
                    {grouped.resolved.map((c) => (
                        <ComplaintCard
                            key={c.uniqueId}
                            complaint={c}
                            onClick={() => {
                                setViewingComplaint(c);
                                setOpenViewModal(true);
                            }}
                        />
                    ))}
                </Section>
            )}
        </div>
    );
}

export default ComplaintList;

function Section({
    title,
    color,
    children,
}: {
    title: string;
    color: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h2 className={`text-lg font-bold mb-2 ${color}`}>{title}</h2>
            <div className="grid grid-cols-3 gap-3">{children}</div>
        </div>
    );
}

function ComplaintCard({
    complaint,
    onClick,
}: {
    complaint: Complaint;
    onClick?: () => void;
}) {
    return (
        <div
            className="rounded-4xl bg-white p-6 cursor-pointer"
            onClick={onClick}
        >
            <h3 className="font-semibold line-clamp-1">{complaint.title}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{complaint.content}</p>
            <p className="text-xs text-gray-400 mt-2">
                {new Date(complaint.createdAt).toLocaleString()}
            </p>
        </div>
    );
}