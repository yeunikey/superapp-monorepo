"use client";

import { useEffect, useState } from "react";
import Modal from "@/shared/ui/Modal";
import { toast } from "react-toastify";
import { useAuth } from "@/entities/data/model/useAuth";
import { ApiResponse } from "@/types";
import xior from "xior";
import { host, newsApi } from "@/shared/api/instance";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
});

import "react-quill-new/dist/quill.snow.css";
import { New } from "@/entities/news/types/news";
import { useNews } from "@/entities/news/model/useNews";
import { useNewEditModal } from "../model/useNewEditModal";

function NewEditModal() {
    const { token } = useAuth();

    const {
        open,
        setOpen,
        editingNew,
        setEditingNew,
        title,
        setTitle,
        content,
        setContent,
        imageId,
        setImageId,
        resetForm,
    } = useNewEditModal();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [mode, setMode] = useState<"editor" | "preview">("editor");
    const { news, setNews } = useNews();

    useEffect(() => {
        if (editingNew) {
            setTitle(editingNew.title);
            setContent(editingNew.content);
            setImageId(editingNew.imageId || "");
        }
    }, [editingNew, setTitle, setContent, setImageId]);

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
            } catch (err) {
                toast.error("Ошибка при загрузке изображения");
                return;
            }
        }

        try {
            if (!editingNew) return;

            const payload = { title, content, imageId: uploadedImageId };

            await newsApi
                .post<ApiResponse<New>>(`/news/${editingNew.id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(({ data }) => {
                    toast.success("Новость успешно обновлена");
                    setOpen(false);

                    const updatedNews = news.map((n) =>
                        n.id === editingNew.id ? data.data : n
                    );
                    setNews(updatedNews);

                    setEditingNew(null);
                    resetForm();
                });
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при сохранении изменений");
        }
    };

    const handleDelete = async () => {
        if (!editingNew) return;

        if (!confirm("Вы уверены, что хотите удалить эту новость?")) return;

        try {
            await newsApi.delete<ApiResponse<null>>(
                `/news/${editingNew.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Новость успешно удалена");

            // Убираем новость из состояния
            const filteredNews = news.filter((n) => n.id !== editingNew.id);
            setNews(filteredNews);

            setOpen(false);
            setEditingNew(null);
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при удалении новости");
        }
    };

    return (
        <Modal
            title="Редактировать новость"
            close={open}
            onClose={() => {
                setOpen(false);
                setEditingNew(null);
            }}
            className="flex flex-row gap-24"
            parentClassName="w-4xl h-fit min-h-0"
        >
            <div className="flex-1 space-y-6 w-full">
                <div className="flex gap-6">
                    <div className="space-y-8 min-w-64 w-64">
                        <div className="space-y-3">
                            <div className="relative w-full aspect-[2] bg-background rounded-3xl flex items-end overflow-hidden">
                                {(selectedFile || imageId) && (
                                    <img
                                        className="absolute inset-0 w-full h-full object-cover"
                                        src={
                                            selectedFile
                                                ? URL.createObjectURL(selectedFile)
                                                : `${host}:4003/images/${imageId}`
                                        }
                                        alt="preview"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                <div className="text-white px-4 py-4 font-semibold text-lg line-clamp-2 z-10 overflow-hidden max-h-20">
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

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Изображение</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setSelectedFile(e.target.files?.[0] || null)
                                }
                                className="block w-full text-sm text-dark file:mr-4 file:py-2 file:px-4
                                           file:rounded-4xl file:border-0
                                           file:text-sm file:font-semibold
                                           file:bg-primary file:text-white
                                           hover:file:bg-primary/90"
                            />
                            {selectedFile && (
                                <p className="text-xs text-gray-500">
                                    Файл выбран: {selectedFile.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grow space-y-3">
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

                <div className="flex justify-end gap-3">
                    <div
                        className="border-red border-2 text-red py-2 px-8 w-fit rounded-4xl cursor-pointer flex justify-center"
                        onClick={handleDelete}
                    >
                        Удалить
                    </div>
                    <div
                        className="bg-primary text-white py-2 px-12 w-fit rounded-4xl cursor-pointer flex justify-center"
                        onClick={handleSubmit}
                    >
                        Сохранить
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default NewEditModal;
