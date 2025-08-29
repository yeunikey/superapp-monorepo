import { create } from 'zustand';
import { New } from '../types/news';

type NewState = {
    news: New[];
    setNews: (news: New[]) => void;

};

export const useNews = create<NewState>((set) => ({

    news: [],
    setNews: (news) => set({ news }),

}));
