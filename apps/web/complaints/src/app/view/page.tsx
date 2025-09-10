"use client";

import { useViewStore } from "@/features/view/model/useViewStore";
import Loader from "@/shared/ui/Loader";
import { host } from "@/shared/api/instance";
import { useState } from "react";
import { Complaint } from "@/entities/complaints/types/complaint";

function ViewPage() {
    const { viewComplaint } = useViewStore();
    const [previewImg, setPreviewImg] = useState<string | null>(null);

    if (!viewComplaint) {
        return (
            <div className="flex justify-center py-12 text-secondary">
                Выберите обращение для просмотра
            </div>
        );
    }

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
                        Рассматривается
                    </div>
                );
        }
    };

    return (
        <div className="py-6">
            <div className="text-2xl font-semibold mb-4 mx-6">
                {viewComplaint.title}
            </div>

            <div className="bg-white rounded-4xl p-6 space-y-6">
                <div>
                    <div className="text-base text-secondary">
                        {viewComplaint.content}
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    {getStatusBadge(viewComplaint.status)}
                    <div className="text-sm text-secondary">
                        {viewComplaint.category?.title}
                    </div>
                </div>

                <div className="text-sm text-secondary">
                    Отправлено:{" "}
                    {new Date(viewComplaint.createdAt).toLocaleString("ru-RU")}
                </div>

                {viewComplaint.resolved && (
                    <div className="text-sm text-green-600">
                        Решено {viewComplaint.resolver
                            ? `(${viewComplaint.resolver})`
                            : ""}
                        {viewComplaint.resolvedAt &&
                            ` — ${new Date(
                                viewComplaint.resolvedAt
                            ).toLocaleString("ru-RU")}`}
                    </div>
                )}
            </div>

            {viewComplaint.images?.length > 0 && (
                <div className="mx-6">
                    <div className="font-semibold pt-6 pb-3">Вложения</div>
                    <div className="grid grid-cols-2 gap-3">
                        {viewComplaint.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={`${host}:1000/v1/images/${img}`}
                                alt={`${img}`}
                                className="rounded-2xl object-cover w-full h-40 cursor-pointer hover:opacity-80 transition"
                                onClick={() =>
                                    setPreviewImg(`${host}:1000/v1/images/${img}`)
                                }
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Модальное окно предпросмотра */}
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
        </div>
    );
}

export default ViewPage;
