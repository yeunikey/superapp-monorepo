import { Group } from "@/entities/data/types/group";
import { create } from "zustand";

type UsersStore = {

    group: Group | null;
    setGroup: (group: Group | null) => void;
};

export const useEditGroupModal = create<UsersStore>((set) => ({

    group: null,
    setGroup: (group) => set({ group }),

}));
