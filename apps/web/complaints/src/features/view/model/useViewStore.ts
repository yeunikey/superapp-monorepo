import { Complaint } from '@/entities/complaints/types/complaint';
import { create } from 'zustand';

type ViewState = {
    viewComplaint: Complaint | null;
    setViewComplaint: (selectedCategory: Complaint | null) => void;
};

export const useViewStore = create<ViewState>((set) => ({
    viewComplaint: null,
    setViewComplaint: (selectedCategory: Complaint | null) => set({
        viewComplaint: selectedCategory
    })
}));
