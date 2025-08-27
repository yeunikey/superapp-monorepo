import { User } from '../types/user';
import { create } from 'zustand';

type AuthState = {
    isAuth: boolean;
    setAuth: (isAuth: boolean) => void;

    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;

    token: string | null;
    setToken: (token: string) => void;

    loggedUser: User | null
    setLoggedUser: (student: User | null) => void;
};

export const useAuth = create<AuthState>((set) => ({

    isAuth: false,
    setAuth: (isAuth) => set({ isAuth }),

    isLoading: true,
    setLoading: (isLoading) => set({ isLoading }),

    token: null,
    setToken: (token) => set({ token }),

    loggedUser: null,
    setLoggedUser: (user) => set({ loggedUser: user }),

}));
