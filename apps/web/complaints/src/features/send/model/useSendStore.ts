import { ComplaintCategory } from '@/entities/complaints/types/category';
import { create } from 'zustand';

type SendState = {
    selectedCategory: ComplaintCategory | null;
    setSelectedCategory: (selectedCategory: ComplaintCategory | null) => void;
};

export const useSendStore = create<SendState>((set) => ({
    selectedCategory: null,
    setSelectedCategory: (selectedCategory: ComplaintCategory | null) => set({
        selectedCategory
    })
}));
