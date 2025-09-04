import { create } from 'zustand';
import { New } from '../types/new';

type AuthState = {
    news: New[];
    setNews: (news: New[]) => void;

    view: New | null;
    setView: (newView: New | null) => void;
};

export const useNews = create<AuthState>((set) => ({
    news: [],
    setNews: (news) => set({ news }),

    view: null,
    setView: (newView) => set({ view: newView }),
}));
