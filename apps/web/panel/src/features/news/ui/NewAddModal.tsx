"use client";

import 'react-quill-new/dist/quill.snow.css';

import { api, host } from "@/shared/api/instance";

import { ApiResponse } from "@/types";
import Modal from "@/shared/ui/Modal";
import { New } from "@/entities/news/types/news";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useAuth } from "@/entities/data/model/useAuth";
import { useNewAddModal } from "../model/useNewAddModal";
import { useNews } from "@/entities/news/model/useNews";
import { useState } from "react";
import xior from "xior";

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
});

function NewAddModal() {
    const { token } = useAuth();
    const { open, setOpen, title, setTitle, content, setContent, imageId, setImageId } = useNewAddModal();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [mode, setMode] = useState<"editor" | "preview">("editor");

    const { news, setNews } = useNews();

    const handleSubmit = async () => {
        if (!title || !content) {
            toast.error("Пожалуйста, заполните все поля");
            return;
        }

        let uploadedImageId = imageId;

        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append("file", selectedFile);

                const uploadRes = await xior.post<ApiResponse<{ id: string }>>(
                    `${host}:4003/images/upload`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                uploadedImageId = uploadRes.data.data.id;
                setImageId(uploadedImageId);
            } catch {
                toast.error("Ошибка при загрузке изображения");
                return;
            }
        }

        try {
            const payload = { title, content, imageId: uploadedImageId };

            await api.post<ApiResponse<New>>("news", payload, {
                headers: { Authorization: `Bearer ${token}` },
            }).then(({ data }) => {

                const updatedNews = news;
                updatedNews.push(data.data);
                setNews(updatedNews);

                toast.success("Новость успешно создана");
                setOpen(false);
            });

        } catch (err) {
            console.error(err);
            toast.error("Ошибка при сохранении новости");
        }
    };

    return (
        <Modal
            title="Создать новость"
            close={open}
            onClose={() => setOpen(false)}
            className="flex flex-row gap-24"
            parentClassName="w-4xl h-fit min-h-0"
        >
            <div className="flex-1 space-y-6 w-full">
                <div className="flex gap-6">
                    <div className="space-y-8 min-w-64 w-64">
                        <div className="space-y-3">
                            <div className="relative w-full aspect-[2] bg-background rounded-3xl flex items-end overflow-hidden">
                                {selectedFile && (
                                    <img
                                        className="absolute inset-0 w-full h-full object-cover"
                                        src={selectedFile ? URL.createObjectURL(selectedFile) : `${host}:4003/images/${imageId}`}
                                        alt="preview"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="text-white px-4 py-4 font-semibold text-lg line-clamp-2 z-10">
                                    {title || "Превью"}
                                </div>
                            </div>

                            <div className="flex items-center bg-background py-2 px-4 rounded-4xl focus-within:outline-2 outline-primary w-full">
                                <input
                                    type="text"
                                    placeholder="Заголовок"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="outline-none text-dark bg-transparent w-full"
                                />
                            </div>
                        </div>

                        {/* Изображение */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Изображение</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                className="block w-full text-sm text-dark file:mr-4 file:py-2 file:px-4
                                           file:rounded-4xl file:border-0
                                           file:text-sm file:font-semibold
                                           file:bg-primary file:text-white
                                           hover:file:bg-primary/90"
                            />
                            {selectedFile && <p className="text-xs text-gray-500">Файл выбран: {selectedFile.name}</p>}
                        </div>
                    </div>

                    <div className="grow space-y-3">
                        {/* Переключатель */}
                        <div className="flex gap-2">
                            <div
                                className={`text-sm py-1.5 px-6 w-fit rounded-4xl cursor-pointer flex justify-center ${mode === "editor"
                                    ? "bg-primary text-white"
                                    : "bg-background text-dark"
                                    }`}
                                onClick={() => setMode("editor")}
                            >
                                Редактор
                            </div>
                            <div
                                className={`text-sm py-1.5 px-6 w-fit rounded-4xl cursor-pointer flex justify-center ${mode === "preview"
                                    ? "bg-primary text-white"
                                    : "bg-background text-dark"
                                    }`}
                                onClick={() => setMode("preview")}
                            >
                                Предпросмотр
                            </div>
                        </div>

                        {/* Контент */}
                        {mode === "editor" ? (
                            <ReactQuill
                                value={content}
                                onChange={setContent}
                                theme="bubble"
                                className="bg-background rounded-4xl focus-within:outline-2 p-2 outline-primary w-full min-h-64 h-96 max-h-96"
                            />
                        ) : (
                            <div
                                className="prose max-w-none p-4"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        )}
                    </div>
                </div>

                {/* Кнопка */}
                <div className="flex justify-end">
                    <div
                        className="bg-primary text-white py-2 px-12 w-fit rounded-4xl cursor-pointer flex justify-center"
                        onClick={handleSubmit}
                    >
                        Создать
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default NewAddModal;
