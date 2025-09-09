"use client";

import { ApiResponse } from "@/types";
import Modal from "@/shared/ui/Modal";
import { api } from "@/shared/api/instance";
import { toast } from "react-toastify";
import { useAuth } from "@/entities/data/model/useAuth";
import { useEffect, useState } from "react";
import { useComplaintStore } from "../model/useComplaintStore";
import { useComplaints } from "@/entities/complaints/model/useComplaints";
import { ComplaintCategory } from "@/entities/complaints/types/category";

function EditCategoryModal() {
    const { openEditModal, setOpenEditModal, editingCategory, setEditingCategory } = useComplaintStore();
    const { token } = useAuth();
    const { categories, setCategories } = useComplaints();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        if (editingCategory) {
            setTitle(editingCategory.title);
            setContent(editingCategory.content);
        }
    }, [editingCategory]);

    const handleSubmit = async () => {
        if (!title || !content) {
            toast.error("Пожалуйста, заполните все поля");
            return;
        }

        try {
            const payload: {
                id?: number;
                title: string;
                content: string;
            } = {
                id: editingCategory?.id,
                title,
                content
            };

            await api
                .post<ApiResponse<ComplaintCategory>>("complaints/categories/edit", payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data }) => {
                    if (data.statusCode !== 200) {
                        toast.error(data.message ?? "Ошибка при создании категории");
                        return;
                    }

                    toast.success("Категория успешно создана");
                    setOpenEditModal(false);
                    setEditingCategory(null);

                    const newCategories = [...categories, data.data];
                    setCategories(newCategories);

                    if (editingCategory) {
                        const updatedCategories = categories.map((c) =>
                            c.id === data.data.id ? data.data : c
                        );
                        setCategories(updatedCategories);
                    }

                });
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при сохранении категории");
        }
    };

    const handleDelete = async () => {
        if (!editingCategory?.id) {
            toast.error("Невозможно удалить: категория не выбрана");
            return;
        }

        if (!confirm("Вы уверены, что хотите удалить эту категорию?")) {
            return;
        }

        try {
            await api
                .delete<ApiResponse<null>>(`complaints/categories/${editingCategory.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data }) => {
                    if (data.statusCode !== 200) {
                        toast.error(data.message ?? "Ошибка при удалении категории");
                        return;
                    }

                    toast.success("Категория удалена");
                    setOpenEditModal(false);
                    setEditingCategory(null);

                    const filteredCategories = categories.filter(
                        (c) => c.id !== editingCategory.id
                    );
                    setCategories(filteredCategories);
                });
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при удалении категории");
        }
    };

    return (
        <Modal
            title="Редактирование категории жалоб"
            close={openEditModal}
            onClose={() => setOpenEditModal(false)}
            className="flex flex-row gap-24"
            parentClassName="w-lg h-fit min-h-0"
        >
            <div className="flex-1 space-y-6 w-full">
                <div className="space-y-2">
                    <div className="flex items-center bg-background py-2 px-4 rounded-4xl focus-within:outline-2 outline-primary w-full">
                        <input
                            type="text"
                            placeholder="Название категории"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="outline-none text-dark bg-transparent w-full"
                        />
                    </div>

                    <div className="flex items-center bg-background py-2 px-4 rounded-2xl focus-within:outline-2 outline-primary w-full">
                        <textarea
                            placeholder="Описание категории"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="outline-none text-dark bg-transparent w-full h-24"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <div
                        className="border-[1px] border-red text-red py-2 px-12 w-fit rounded-4xl cursor-pointer flex justify-center"
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

export default EditCategoryModal;
