"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { host, userApi } from "@/shared/api/instance";

import { ApiResponse } from "@/types";
import Modal from "@/shared/ui/Modal";
import { User } from "@/entities/data/types/user";
import { fetchGroups } from "../model/usersService";
import { toast } from "react-toastify";
import { useUserAddModal } from "../model/modal/useUserAddModal";
import { useAuth } from "@/entities/data/model/useAuth";
import { useGroups } from "@/entities/data/model/useGroups";
import { useUsers } from "@/entities/data/model/useUsers";
import { useUsersStore } from "../model/useUsersStore";
import xior from "xior";

function UserAddModal() {
    const { addModal, setAddModal } = useUsersStore();
    const { token } = useAuth();

    const {
        barcode, setBarcode,
        name, setName,
        surname, setSurname,
        group, setGroup,
        resetForm
    } = useUserAddModal();

    const { groups } = useGroups();
    const { users, setUsers } = useUsers();

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

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

            const reader = new FileReader();
            reader.onload = (ev) => {
                setPreview(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async () => {
        if (!barcode || !name || !surname) {
            toast.error("Пожалуйста, заполните все поля");
            return;
        }

        try {
            let imageId: string | undefined;

            if (image) {
                const formData = new FormData();
                formData.append("file", image);
                for (const pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                }
                const uploadRes = await xior.post<ApiResponse<{ id: string }>>(
                    `${host}:4003/images/upload`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                imageId = uploadRes.data.data.id;
            }

            const payload: {
                barcode: string;
                name: string;
                surname: string;
                group?: { id: number };
                imageId?: string;
            } = { barcode, name, surname };

            if (group) {
                const selectedGroup = groups.find((g) => g.name === group);
                if (!selectedGroup) {
                    toast.error("Такой группы не существует");
                    return;
                }
                payload.group = { id: selectedGroup.id };
            }

            if (imageId) {
                payload.imageId = imageId;
            }

            await userApi.post<ApiResponse<User>>("/users/new", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(({ data }) => {
                if (data.statusCode != 200) {
                    toast.error(data.message);
                    return;
                }

                toast.success("Пользователь успешно добавлен");
                setAddModal(false);

                const newUsers = users;
                users.push(data.data);
                setUsers(newUsers);

                resetForm()
            });
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при сохранении пользователя");
        }
    };

    return (
        <Modal
            title="Добавление пользователя"
            close={addModal}
            onClose={() => setAddModal(false)}
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

                <div className="mt-4 text-secondary text-sm">
                    * максимальный размер изображения 2 МБ
                </div>

                <div
                    className="mt-12 bg-primary text-white py-2 w-full rounded-4xl cursor-pointer flex justify-center"
                    onClick={handleSubmit}
                >
                    Создать
                </div>
            </div>

            <div className="flex-1 space-y-6 w-full">
                <div className="flex items-center bg-background py-2 px-4 rounded-4xl focus-within:outline-2 outline-primary w-full">
                    <input
                        type="text"
                        placeholder="Баркод"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        className="outline-none text-dark bg-transparent w-full"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center bg-background py-2 px-4 rounded-4xl focus-within:outline-2 outline-primary w-full">
                        <input
                            type="text"
                            placeholder="Имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="outline-none text-dark bg-transparent w-full"
                        />
                    </div>

                    <div className="flex items-center bg-background py-2 px-4 rounded-4xl focus-within:outline-2 outline-primary w-full">
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
                    <div className="flex items-center bg-background py-2 px-4 rounded-4xl focus-within:outline-2 outline-primary w-full">
                        <input
                            type="text"
                            placeholder="Группа"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            className="outline-none text-dark bg-transparent w-full"
                        />
                    </div>

                    <div className="text-secondary text-sm">
                        {!group ? '* к примеру: SE-2402, MT-2406, CS-2414' : !groups.find(g => g.name == group) ? 'Группа не найдена' : 'Всё правильно!'}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default UserAddModal;
