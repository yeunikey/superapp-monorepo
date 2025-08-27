"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { host, userApi } from "@/shared/api/instance";

import { ApiResponse } from "@/types";
import Modal from "@/shared/ui/Modal";
import { User } from "@/entities/data/types/user";
import { fetchGroups } from "../model/usersService";
import { toast } from "react-toastify";
import { useAuth } from "@/entities/data/model/useAuth";
import { useEditModal } from "../model/modal/useEditModal";
import { useGroups } from "@/entities/data/model/useGroups";
import { useUsers } from "@/entities/data/model/useUsers";
import { useUsersStore } from "../model/useUsersStore";
import xior from "xior";

function EditModal() {
    const { editModal, setEditModal } = useUsersStore();
    const { token } = useAuth();

    const {
        barcode,
        setBarcode,
        name,
        setName,
        surname,
        setSurname,
        group,
        setGroup,
        resetForm,
        user,
    } = useEditModal();

    const { groups } = useGroups();
    const { users, setUsers } = useUsers();

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [removeImage, setRemoveImage] = useState(false);

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Максимальный размер изображения 2 МБ");
                return;
            }
            setImage(file);
            setRemoveImage(false);

            const reader = new FileReader();
            reader.onload = (ev) => {
                setPreview(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
        setRemoveImage(true);
    };

    const handleSubmit = async () => {
        if (!barcode || !name || !surname) {
            toast.error("Пожалуйста, заполните все поля");
            return;
        }

        try {
            let imageId: string | null | undefined;

            if (removeImage) {
                imageId = null;
            } else if (image) {
                const formData = new FormData();
                formData.append("file", image);

                const uploadRes = await xior.post<ApiResponse<{ id: string }>>(
                    `${host}:4003/images/upload`,
                    formData,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                imageId = uploadRes.data.data.id;
            }

            const payload: {
                barcode: string;
                name: string;
                surname: string;
                group?: { id: number } | null;
                imageId?: string | null;
            } = { barcode, name, surname };

            // группа
            if (!group.trim()) {
                payload.group = null;
            } else {
                const selectedGroup = groups.find((g) => g.name === group);
                if (!selectedGroup) {
                    toast.error("Такой группы не существует");
                    return;
                }
                payload.group = { id: selectedGroup.id };
            }

            // картинка
            if (imageId !== undefined) {
                payload.imageId = imageId;
            }

            const { data } = await userApi.post<ApiResponse<User>>(
                "/users/edit",
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (data.statusCode !== 200) {
                toast.error(data.message);
                return;
            }

            if (user) {
                const updatedUsers = users.map((u) =>
                    u.barcode === data.data.barcode ? data.data : u
                );
                setUsers(updatedUsers);
                toast.success("Пользователь обновлён");
            } else {
                setUsers([...users, data.data]);
                toast.success("Пользователь добавлен");
            }

            setEditModal(false);
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при сохранении пользователя");
        }
    };

    useEffect(() => {
        if (editModal && user) {
            setBarcode(user.barcode);
            setName(user.name);
            setSurname(user.surname);
            setGroup(user.group?.name || "");
            setRemoveImage(false);

            if (user.imageId) {
                setPreview(`${host}:4003/images/${user.imageId}`);
            }
        } else if (!editModal) {
            resetForm();
            setImage(null);
            setPreview(null);
            setRemoveImage(false);
        }
    }, [editModal, user]);

    const handleDelete = async () => {
        if (!user) return;

        if (!confirm("Вы уверены, что хотите удалить этого пользователя?")) {
            return;
        }

        try {
            const { data } = await userApi.delete<ApiResponse>(
                `/users/${user.barcode}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (data.statusCode !== 200) {
                toast.error(data.message);
                return;
            }

            setUsers(users.filter((u) => u.barcode !== user.barcode));

            toast.success("Пользователь удалён");
            setEditModal(false);
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при удалении пользователя");
        }
    };


    return (
        <Modal
            title="Редактирование пользователя"
            close={editModal}
            onClose={() => setEditModal(false)}
            className="flex flex-row gap-24"
            parentClassName="w-2xl"
        >
            <div className="w-48">
                <label htmlFor="image-upload" className="cursor-pointer">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="rounded-full w-24 h-24 object-cover bg-secondary"
                        />
                    ) : (
                        <div className="rounded-full w-24 h-24 text-2xl bg-background flex justify-center items-center text-secondary">
                            АУ
                        </div>
                    )}
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />

                {preview && (
                    <div
                        className="mt-2 text-red-500 text-sm cursor-pointer"
                        onClick={handleRemoveImage}
                    >
                        Удалить фото
                    </div>
                )}

                <div className="mt-4 text-secondary text-sm">
                    * максимальный размер изображения 2 МБ
                </div>

                <div className="space-y-2">
                    <div
                        className="mt-12 border-[1px] border-red text-red py-2 w-full rounded-4xl cursor-pointer flex justify-center"
                        onClick={handleDelete}
                    >
                        Удалить
                    </div>

                    <div
                        className="bg-primary text-white py-2 w-full rounded-4xl cursor-pointer flex justify-center"
                        onClick={handleSubmit}
                    >
                        Редактировать
                    </div>
                </div>
            </div>

            <div className="flex-1 space-y-6 w-full">
                <div className="flex items-center bg-background py-2 px-4 rounded-4xl w-full gap-3">
                    <input
                        type="text"
                        placeholder="Баркод"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        className="outline-none text-dark/50 bg-transparent w-full"
                        disabled
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center bg-background py-2 px-4 rounded-4xl w-full">
                        <input
                            type="text"
                            placeholder="Имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="outline-none text-dark bg-transparent w-full"
                        />
                    </div>

                    <div className="flex items-center bg-background py-2 px-4 rounded-4xl w-full">
                        <input
                            type="text"
                            placeholder="Фамилия"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="outline-none text-dark bg-transparent w-full"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center bg-background py-2 px-4 rounded-4xl w-full">
                        <input
                            type="text"
                            placeholder="Группа"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            className="outline-none text-dark bg-transparent w-full"
                        />
                    </div>

                    <div className="text-secondary text-sm">
                        {!group
                            ? "* к примеру: SE-2402, MT-2406, CS-2414"
                            : !groups.find((g) => g.name === group)
                                ? "Группа не найдена (оставь пусто чтобы удалить)"
                                : "Всё правильно!"}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default EditModal;
