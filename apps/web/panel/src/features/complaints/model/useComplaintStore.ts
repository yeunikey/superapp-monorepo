import { create } from 'zustand';

type ComplaintState = {
    type: "complaints" | "categories";
    setType: (type: "complaints" | "categories") => void;

    openAddModal: boolean;
    setOpenAddModal: (open: boolean) => void;

    openEditModal: boolean;
    setOpenEditModal: (open: boolean) => void;
};

export const useComplaintStore = create<ComplaintState>((set) => ({
    type: "complaints",
    setType: (type) => set({ type }),


    openAddModal: false,
    setOpenAddModal: (open) => set({ openAddModal: open }),

    openEditModal: false,
    setOpenEditModal: (open) => set({ openEditModal: open }),
}));
