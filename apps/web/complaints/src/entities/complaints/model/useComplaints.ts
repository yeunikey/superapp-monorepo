import { create } from 'zustand';
import { ComplaintCategory } from '../types/category';
import { Complaint } from '../types/complaint';

type ComplaintState = {
    categories: ComplaintCategory[];
    setCategories: (categories: ComplaintCategory[]) => void;

    complaints: Complaint[];
    setComplaints: (complaints: Complaint[]) => void;

};

export const useComplaints = create<ComplaintState>((set) => ({

    categories: [],
    setCategories: (categories) => set({ categories }),

    complaints: [],
    setComplaints: (complaints) => set({ complaints })

}));
