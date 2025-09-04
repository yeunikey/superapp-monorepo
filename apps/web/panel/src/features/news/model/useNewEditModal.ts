
import { New } from "@/entities/news/types/news";
import { create } from "zustand";

type UsersStore = {
    open: boolean;
    setOpen: (open: boolean) => void;

    editingNew: New | null;
    setEditingNew: (editingNew: New | null) => void;

    title: string;
    setTitle: (value: string) => void;

    content: string;
    setContent: (value: string) => void;

    publishedAt: string;
    setPublishedAt: (value: string) => void;

    imageId: string;
    setImageId: (value: string) => void;

    resetForm: () => void;
};

export const useNewEditModal = create<UsersStore>((set) => ({
    open: false,
    setOpen: (open: boolean) => set({ open }),

    editingNew: null,
    setEditingNew: (editingNew) => set({ editingNew }),

    title: "",
    setTitle: (value) => set({ title: value }),

    content: "",
    setContent: (value) => set({ content: value }),

    publishedAt: "",
    setPublishedAt: (value) => set({ publishedAt: value }),

    imageId: "",
    setImageId: (value) => set({ imageId: value }),

    resetForm: () => set({ title: "", content: "", publishedAt: "", imageId: "", }),

}));