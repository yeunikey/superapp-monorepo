"use client";

import { fetchComplaints } from "@/entities/complaints/model/fetchComplaints";
import { useComplaints } from "@/entities/complaints/model/useComplaints";
import { Complaint } from "@/entities/complaints/types/complaint";
import { useAuth } from "@/entities/data/model/useAuth";
import { useViewStore } from "@/features/view/model/useViewStore";
import Loader from "@/shared/ui/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ComplaintsPage() {
    const { complaints } = useComplaints();
    const { token } = useAuth();

    const router = useRouter();
    const { setViewComplaint } = useViewStore();

    useEffect(() => {
        if (!token) return;
        fetchComplaints();
    }, [token]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "resolved":
                return (
                    <div className="text-sm text-white py-1 px-3 bg-green-600 rounded-full">
                        Обработано
                    </div>
                );
            case "pending":
                return (
                    <div className="text-sm py-1 px-3 bg-background rounded-full">
                        Не рассмотрено
                    </div>
                );
            case "processing":
            default:
                return (
                    <div className="text-sm py-1 px-3 bg-background rounded-full flex gap-2 items-center">
                        <Loader childClassName="w-4 h-4 border-3" />
                        Рассматривается
                    </div>
                );
        }
    };

    const handleView = async (complaint: Complaint) => {
        setViewComplaint(complaint)
        router.push('/view')
    }

    return (
        <div className="py-6 pb-32">
            <div className="text-2xl font-semibold mb-3 mx-6">Мои обращения</div>

            <div className="px-6 py-4 rounded-4xl bg-white">
                {complaints.length === 0 ? (
                    <div className="text-center text-secondary py-8">
                        У вас пока нет обращений
                    </div>
                ) : (
                    complaints.map((c, idx) => (
                        <div key={c.uniqueId}>
                            <div className="test" onClick={() => handleView(c)}>
                                <div className="font-semibold line-clamp-1">{c.title}</div>
                                <div className="text-sm text-secondary mt-1 line-clamp-2">
                                    {c.content}
                                </div>

                                <div className="mt-4 flex gap-4 items-center">
                                    {getStatusBadge(c.status)}
                                    <div className="text-sm text-secondary">
                                        {c.category?.title}
                                    </div>
                                </div>
                            </div>

                            {idx < complaints.length - 1 && (
                                <div className="flex justify-center my-4">
                                    <div className="w-[95%] bg-background h-0.5" />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default ComplaintsPage;
