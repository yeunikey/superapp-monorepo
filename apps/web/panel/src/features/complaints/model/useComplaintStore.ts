import { ComplaintCategory } from '@/entities/complaints/types/category';
import { Complaint } from '@/entities/complaints/types/complaint';
import { create } from 'zustand';

type ComplaintState = {
    type: "complaints" | "categories";
    setType: (type: "complaints" | "categories") => void;

    openAddModal: boolean;
    setOpenAddModal: (open: boolean) => void;

    openEditModal: boolean;
    setOpenEditModal: (open: boolean) => void;

    openViewModal: boolean;
    setOpenViewModal: (open: boolean) => void;

    editingCategory: ComplaintCategory | null;
    setEditingCategory: (category: ComplaintCategory | null) => void;

    viewingComplaint: Complaint | null;
    setViewingComplaint: (viewingComplaint: Complaint | null) => void;
};

export const useComplaintStore = create<ComplaintState>((set) => ({
    type: "complaints",
    setType: (type) => set({ type }),

    openAddModal: false,
    setOpenAddModal: (open) => set({ openAddModal: open }),

    openEditModal: false,
    setOpenEditModal: (open) => set({ openEditModal: open }),

    openViewModal: false,
    setOpenViewModal: (open) => set({ openViewModal: open }),

    editingCategory: null,
    setEditingCategory: (category) => set({ editingCategory: category }),

    viewingComplaint: null,
    setViewingComplaint: (viewingComplaint: Complaint | null) => set({ viewingComplaint })
}));
