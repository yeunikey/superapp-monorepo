"use client";

import { ApiResponse } from "@/types";
import Modal from "@/shared/ui/Modal";
import { User } from "@/entities/data/types/user";
import { api } from "@/shared/api/instance";
import { toast } from "react-toastify";
import { useAuth } from "@/entities/data/model/useAuth";
import { useGroups } from "@/entities/data/model/useGroups";
import { useGroupStore } from "../../users/model/useGroupStore";
import { useState } from "react";

function NewGroupModal() {
    const { addModal, setAddModal } = useGroupStore();
    const { token } = useAuth();

    const { groups, setGroups } = useGroups();

    const [name, setName] = useState<string>('');

    const handleSubmit = async () => {
        
        if (!name) {
            toast.error("Пожалуйста, заполните все поля");
            return;
        }

        try {

            const payload: {
                name: string;
            } = { name };

            await api.post<ApiResponse<User>>("data/groups/new", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(({ data }) => {
                if (data.statusCode != 200) {
                    toast.error(data.message);
                    return;
                }

                toast.success("Группа успешно создана");
                setAddModal(false);

                const newGroups = groups;
                groups.push(data.data);
                setGroups(newGroups);

            });
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при сохранении группы");
        }
    };

    return (
        <Modal
            title="Создание группы"
            close={addModal}
            onClose={() => setAddModal(false)}
            className="flex flex-row gap-24"
            parentClassName="w-lg h-fit min-h-0"
        >
            <div className="flex-1 space-y-6 w-full">
                <div className="flex items-center bg-background py-2 px-4 rounded-4xl focus-within:outline-2 outline-primary w-full">
                    <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="outline-none text-dark bg-transparent w-full"
                    />
                </div>

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

export default NewGroupModal;
