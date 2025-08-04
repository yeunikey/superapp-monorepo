import { Student } from '../types/student';
import { create } from 'zustand';

type AuthState = {
    isAuth: boolean;
    setAuth: (isAuth: boolean) => void;

    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;

    token: string;
    setToken: (token: string) => void;

    loggedStudent: Student | null
    setLoggedStudent: (student: Student | null) => void;
};

export const useAuth = create<AuthState>((set) => ({

    isAuth: false,
    setAuth: (isAuth) => set({ isAuth }),

    isLoading: true,
    setLoading: (isLoading) => set({ isLoading }),

    token: '',
    setToken: (token) => set({ token }),

    loggedStudent: {
        id: 1,
        barcode: '242277',
        name: 'Ерасыл',
        surname: 'Унербек',
        group: {
            id: 1,
            name: 'SE-2402'
        },
        image: '@assets/avatar.jpg',
        score: 24,
        role: {
            key: 'dev',
            name: 'Разработчик'
        }
    },
    setLoggedStudent: (student) => set({ loggedStudent: student }),

}));