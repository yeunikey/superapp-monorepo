import { create } from 'zustand';

type GroupState = {
    searchText: string;
    setSearchText: (searchText: string) => void;

    addModal: boolean;
    setAddModal: (addModal: boolean) => void;

    editModal: boolean;
    setEditModal: (editModal: boolean) => void;
};

export const useGroupStore = create<GroupState>((set) => ({
    searchText: "",
    setSearchText: (searchText: string) => set({ searchText }),

    addModal: false,
    setAddModal: (addModal: boolean) => set({ addModal }),

    editModal: false,
    setEditModal: (editModal: boolean) => set({ editModal }),
}));
