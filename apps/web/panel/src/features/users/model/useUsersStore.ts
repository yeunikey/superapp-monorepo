import { create } from 'zustand';

type UsersState = {
    searchText: string;
    setSearchText: (searchText: string) => void;

    addModal: boolean;
    setAddModal: (addModal: boolean) => void;

    editModal: boolean;
    setEditModal: (editModal: boolean) => void;
};

export const useUsersStore = create<UsersState>((set) => ({
    searchText: "",
    setSearchText: (searchText: string) => set({ searchText }),

    addModal: false,
    setAddModal: (addModal: boolean) => set({ addModal }),

    editModal: false,
    setEditModal: (editModal: boolean) => set({ editModal }),
}));
