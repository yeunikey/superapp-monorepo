"use client";

import { useEffect, useState } from "react";

import { ApiResponse } from "@/types";
import { Group } from "@/entities/data/types/group"; // 👈 сделай тип группы
import Modal from "@/shared/ui/Modal";
import { api } from "@/shared/api/instance";
import { toast } from "react-toastify";
import { useAuth } from "@/entities/data/model/useAuth";
import { useGroupEditModal } from "@/features/groups/model/useGroupEditModal";
import { useGroups } from "@/entities/data/model/useGroups";
import { useGroupsStore } from "../../users/model/useGroupsStore";

function GroupEditModal() {
    const { editModal, setEditModal } = useGroupsStore();
    const { token } = useAuth();

    const { groups, setGroups } = useGroups();
    const { group } = useGroupEditModal();

    const [name, setName] = useState<string>("");

    const handleSave = async () => {
        if (!name) {
            toast.error("Пожалуйста, заполните все поля");
            return;
        }

        try {
            const payload: { id?: number; name: string } = { id: group?.id, name };

            const url = group?.id ? "data/groups/edit" : "data/groups/new";

            await api.post<ApiResponse<Group>>(url, payload, {
                headers: { Authorization: `Bearer ${token}` },
            }).then(({ data }) => {
                if (data.statusCode !== 200) {
                    toast.error(data.message);
                    return;
                }

                if (group?.id) {
                    // редактирование
                    const updated = groups.map(g => g.id === group.id ? data.data : g);
                    setGroups(updated);
                    toast.success("Группа успешно изменена");
                } else {
                    // создание
                    setGroups([...groups, data.data]);
                    toast.success("Группа успешно создана");
                }

                setEditModal(false);
            });
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при сохранении группы");
        }
    };

    const handleDelete = async () => {
        if (!group?.id) return;

        try {
            await api.delete<ApiResponse>(`data/groups/${group.name}`, {
                headers: { Authorization: `Bearer ${token}` },
            }).then(({ data }) => {
                if (data.statusCode !== 200) {
                    toast.error(data.message);
                    return;
                }

                const filtered = groups.filter(g => g.name !== group.name);
                setGroups(filtered);

                toast.success("Группа успешно удалена");
                setEditModal(false);
            });
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при удалении группы");
        }
    };

    useEffect(() => {
        setName(group?.name ?? "");
    }, [group]);

    return (
        <Modal
            title="Редактирование группы"
            close={editModal}
            onClose={() => setEditModal(false)}
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

                <div className="flex gap-3 justify-end">
                    {group?.id && (
                        <div
                            className="border-[1px] border-red text-red py-2 px-12 w-fit rounded-4xl cursor-pointer flex justify-center"
                            onClick={handleDelete}
                        >
                            Удалить
                        </div>
                    )}

                    <div
                        className="bg-primary text-white py-2 px-12 w-fit rounded-4xl cursor-pointer flex justify-center"
                        onClick={handleSave}
                    >
                        {group?.id ? "Сохранить" : "Создать"}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default GroupEditModal;


