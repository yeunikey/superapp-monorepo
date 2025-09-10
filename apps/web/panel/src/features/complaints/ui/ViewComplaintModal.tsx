"use client";

import { useComplaintStore } from "@/features/complaints/model/useComplaintStore";
import Modal from "@/shared/ui/Modal";
import Loader from "@/shared/ui/Loader";
import { api, host } from "@/shared/api/instance";
import { useEffect, useState } from "react";
import { Complaint } from "@/entities/complaints/types/complaint";
import { User } from "@/entities/data/types/user";
import { ApiResponse } from "@/types";
import { useAuth } from "@/entities/data/model/useAuth";
import Avatar from "@/shared/ui/Avatar";
import { useComplaints } from "@/entities/complaints/model/useComplaints";

function ViewComplaintModal() {
    const { openViewModal, setOpenViewModal, viewingComplaint } = useComplaintStore();
    const [previewImg, setPreviewImg] = useState<string | null>(null);

    const { token, loggedUser } = useAuth();

    const [sender, setSender] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const { complaints, setComplaints } = useComplaints();

    const fetchSender = async (barcode: string) => {
        try {
            const { data } = await api.get<ApiResponse<User>>(
                `data/users/${barcode}`,
                {
                    headers: { Authorization: "Bearer " + token },
                }
            );

            if (data.statusCode === 200) {
                setSender(data.data);
            }
        } catch (err) {
            console.error("Ошибка при загрузке отправителя:", err);
        }
    };

    useEffect(() => {
        if (viewingComplaint?.sender && token) {
            fetchSender(viewingComplaint.sender);
        } else {
            setSender(null);
        }
    }, [viewingComplaint]);

    const updateStatus = async (status: Complaint["status"]) => {
        if (!viewingComplaint) return;
        setLoading(true);
        try {
            await api.patch<ApiResponse<Complaint>>(
                `complaints/${viewingComplaint.uniqueId}/status`,
                { status },
                { headers: { Authorization: "Bearer " + token } }
            );
        } catch (err) {
            console.error("Ошибка обновления статуса:", err);
        } finally {
            setLoading(false);
        }

        setComplaints(
            complaints.map((c) =>
                c.uniqueId === viewingComplaint.uniqueId
                    ? { ...c, status }
                    : c
            )
        );
    };

    const deleteComplaint = async () => {
        if (!viewingComplaint) return;
        if (!confirm("Вы уверены, что хотите удалить обращение?")) return;

        setLoading(true);
        try {
            await api.delete<ApiResponse>(
                `complaints/${viewingComplaint.uniqueId}`,
                { headers: { Authorization: "Bearer " + token } }
            );
            setOpenViewModal(false);
            setComplaints(
                complaints.filter((c) => c.uniqueId !== viewingComplaint.uniqueId)
            );
        } catch (err) {
            console.error("Ошибка удаления:", err);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (viewingComplaint?.sender && token) {
            fetchSender(viewingComplaint.sender);
        } else {
            setSender(null);
        }
    }, [viewingComplaint]);

    if (!viewingComplaint) return null;

    const getStatusBadge = (status: Complaint["status"]) => {
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
            default:
                return (
                    <div className="text-sm py-1 px-3 bg-background rounded-full flex gap-2 items-center">
                        <Loader childClassName="w-4 h-4 border-3" />

                        <div className="test">
                            Рассматривается
                        </div>
                    </div>
                );
        }
    };

    return (
        <Modal
            title="Информация об обращении"
            close={openViewModal}
            onClose={() => setOpenViewModal(false)}
            className="flex gap-12"
            parentClassName="w-4xl h-fit min-h-0"
        >
            <div className="space-y-6 min-w-96 w-96">
                <div className="space-y-1">
                    <div className="text-xl font-semibold">{viewingComplaint.title}</div>

                    <div className="text-sm text-secondary">
                        Отправлено:{" "}
                        {new Date(viewingComplaint.createdAt).toLocaleString("ru-RU")}
                    </div>

                    <div className="flex gap-4 items-center mt-4">
                        {getStatusBadge(viewingComplaint.status)}
                        <div className="text-sm text-secondary">
                            {viewingComplaint.category?.title}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl space-y-4">
                    {viewingComplaint.resolved && (
                        <div className="text-sm text-green-600">
                            Решено {viewingComplaint.resolver
                                ? `(${viewingComplaint.resolver})`
                                : ""}
                            {viewingComplaint.resolvedAt &&
                                ` — ${new Date(
                                    viewingComplaint.resolvedAt
                                ).toLocaleString("ru-RU")}`}
                        </div>
                    )}
                </div>

                {viewingComplaint.images?.length > 0 && (
                    <div>
                        <div className="font-semibold pb-3">Вложения</div>
                        <div className="grid grid-cols-2 gap-3">
                            {viewingComplaint.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={`${host}:1000/v1/images/${img}`}
                                    alt={img}
                                    className="rounded-2xl object-cover w-full h-40 cursor-pointer hover:opacity-80 transition"
                                    onClick={() =>
                                        setPreviewImg(`${host}:1000/v1/images/${img}`)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}

                {previewImg && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                        onClick={() => setPreviewImg(null)}
                    >
                        <img
                            src={previewImg}
                            alt="preview"
                            className="max-w-[90%] max-h-[90%] rounded-2xl shadow-lg"
                        />
                    </div>
                )}

                {sender && (
                    <div>
                        <div className="font-semibold pb-3">Отправитель</div>
                        <div className="flex gap-4 items-center min-w-lg">
                            <Avatar user={sender} />
                            <div className="flex flex-col">
                                <div className="font-semibold text-dark">
                                    {sender.surname} {sender.name}
                                </div>
                                <div className="text-secondary text-[12px]">
                                    {sender.barcode}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="grow flex flex-col justify-between">
                <div className="text-base break-words whitespace-break-spaces">
                    {viewingComplaint.content}
                </div>

                {loggedUser && (
                    <div className="flex gap-3 items-center justify-end">
                        <select
                            className="border rounded-lg px-3 py-2"
                            defaultValue={viewingComplaint.status}
                            onChange={(e) =>
                                updateStatus(e.target.value as Complaint["status"])
                            }
                            disabled={loading}
                        >
                            <option value="pending">Не рассмотрено</option>
                            <option value="in_progress">Рассматривается</option>
                            <option value="resolved">Обработано</option>
                        </select>

                        <button
                            className="bg-red-600 text-white px-4 py-2 h-fit rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                            onClick={deleteComplaint}
                            disabled={loading}
                        >
                            Удалить
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default ViewComplaintModal;
