import { create } from 'zustand';

type LoaderState = {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
};

export const useImageLoader = create<LoaderState>((set) => ({

    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),

}));
