"use client";

import { fetchComplaints } from "@/entities/complaints/model/fetchComplaints";
import { useComplaints } from "@/entities/complaints/model/useComplaints";
import { Complaint } from "@/entities/complaints/types/complaint";
import { useAuth } from "@/entities/data/model/useAuth";
import { useViewStore } from "@/features/view/model/useViewStore";
import Loader from "@/shared/ui/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

function MyComplaints() {
    const router = useRouter();
    const { complaints } = useComplaints();
    const { token } = useAuth();
    const { setViewComplaint } = useViewStore();

    useEffect(() => {
        if (!token) return;
        fetchComplaints();
    }, [token]);

    const handleView = async (complaint: Complaint) => {
        setViewComplaint(complaint)
        router.push('/view')
    }

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

    const latestComplaints = useMemo(() => {
        return [...complaints]
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )
            .slice(0, 2);
    }, [complaints]);

    return (
        <div>
            <div className="text-2xl font-semibold mb-3 mx-6">Последние обращения</div>

            <div className="px-6 py-4 rounded-4xl bg-white">
                {latestComplaints.length === 0 ? (
                    <div className="text-center text-secondary py-8">
                        У вас пока нет обращений
                    </div>
                ) : (
                    latestComplaints.map((c, idx) => (
                        <div key={c.uniqueId}>
                            <div onClick={() => handleView(c)}>
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

                            {idx < latestComplaints.length - 1 && (
                                <div className="flex justify-center my-4">
                                    <div className="w-[95%] bg-background h-0.5" />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {latestComplaints.length > 0 && (
                <div className="flex justify-center py-4 items-center gap-3 cursor-pointer" onClick={() => router.push('/my')}>
                    <div className="text-secondary">Посмотреть все</div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-secondary"
                        height="28px"
                        viewBox="0 -960 960 960"
                    >
                        <path d="M655-200 513-342l56-56 85 85 170-170 56 57-225 226Zm0-320L513-662l56-56 85 85 170-170 56 57-225 226ZM80-280v-80h360v80H80Zm0-320v-80h360v80H80Z" />
                    </svg>
                </div>
            )}
        </div>
    );
}

export default MyComplaints;
