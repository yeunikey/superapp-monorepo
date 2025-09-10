"use client";

import { useAuth } from "@/entities/data/model/useAuth";
import { useSendStore } from "@/features/send/model/useSendStore";
import { api, vapi } from "@/shared/api/instance";
import Loader from "@/shared/ui/Loader";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

function SendPage() {
    const router = useRouter();
    const [fetching, setFetching] = useState(false);

    const { selectedCategory, setSelectedCategory } = useSendStore();
    const { token } = useAuth();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const MAX_IMAGES = 3;
    const MAX_SIZE_MB = 2;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];

        if (images.length >= MAX_IMAGES) {
            e.target.value = "";
            return;
        }

        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            e.target.value = "";
            return;
        }

        setImages((prev) => [...prev, file]);
        e.target.value = "";
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCancel = () => {
        setTitle("");
        setContent("");
        setImages([]);


        router.back();

        setSelectedCategory(null);
    };

    const handleSubmit = async () => {

        setFetching(true);

        try {
            const uploadedImageIds: string[] = [];

            for (const image of images) {
                const formData = new FormData();
                formData.append("file", image);

                const uploadRes = await vapi.post<{ data: { id: string } }>(
                    `images/upload`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                uploadedImageIds.push(uploadRes.data.data.id);
            }

            await api.post(
                `complaints`,
                {
                    category: {
                        id: selectedCategory?.id
                    },
                    title,
                    content,
                    images: uploadedImageIds,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            setTitle("");
            setContent("");
            setImages([]);

            router.replace("/success");
            setSelectedCategory(null);
        } catch (err) {
            console.error("Ошибка при отправке:", err);
        }

    };

    return (
        <div className="py-6 space-y-6 pb-32">

            {fetching && (
                <div className="fixed top-0 left-0 w-dvw h-dvh bg-dark/15 flex flex-col justify-center items-center">
                    <Loader />

                    <div className="mt-6 text-center text-dark">
                        Не закрывайте страницу
                    </div>
                </div>
            )}

            <div className="space-y-3">
                <div className="text-2xl font-semibold mx-6">Выбранная категория</div>

                <div className="grid gap-3">
                    <div className="p-4 rounded-4xl bg-white px-6 py-4">
                        <div className="font-semibold text-lg">{selectedCategory?.title}</div>
                        <div className="text-sm text-gray-600 mt-1">
                            {selectedCategory?.content}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="text-2xl font-semibold mx-6">Форма обращения</div>

                <div className="flex items-center bg-white py-4 px-6 rounded-4xl focus-within:outline-2 outline-primary w-full">
                    <input
                        type="text"
                        placeholder="Заголовок обращения"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="outline-none text-dark bg-transparent w-full"
                    />
                </div>

                <div className="flex items-center bg-white py-4 px-6 rounded-3xl focus-within:outline-2 outline-primary w-full">
                    <textarea
                        placeholder="Описание обращения"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="outline-none text-dark bg-transparent w-full h-48"
                    />
                </div>
            </div>

            <div className="space-y-3 px-4">
                <div className="flex gap-3 flex-wrap">
                    {images.map((file, idx) => (
                        <div
                            key={idx}
                            className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-300 shadow-sm"
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`upload-${idx}`}
                                className="object-cover w-full h-full"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full px-2 py-0.5 text-xs"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {images.length < MAX_IMAGES && (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray rounded-xl cursor-pointer hover:border-primary hover:text-primary transition"
                        >
                            <span className="text-3xl font-bold text-gray">+</span>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>

            <div className="flex justify-between px-4 pt-4">
                <button
                    onClick={handleCancel}
                    className="px-6 py-3 rounded-2xl bg-red-100 text-red-600 font-semibold hover:bg-red-300 transition"
                >
                    Отменить
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 rounded-2xl bg-primary text-white font-semibold hover:bg-primary/80 transition"
                >
                    Отправить
                </button>
            </div>
        </div>
    );
}

export default SendPage;
