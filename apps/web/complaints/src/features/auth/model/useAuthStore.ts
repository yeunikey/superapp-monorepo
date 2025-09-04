import { create } from 'zustand';

type AuthState = {
    type: "login" | "code";
    setType: (type: "login" | "code") => void;

    fetching: boolean;
    setFetching: (fetching: boolean) => void;

    email: string;
    setEmail: (email: string) => void;

    codeDigits: string[];
    setCodeDigit: (index: number, value: string) => void;
    resetCodeDigits: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    type: "login",
    setType: (type) => set({ type }),

    fetching: false,
    setFetching: (fetching) => set({ fetching }),

    email: "",
    setEmail: (email) => set({ email }),

    codeDigits: ["", "", "", ""],
    setCodeDigit: (index, value) => set((state) => {
        const updated = [...state.codeDigits];
        updated[index] = value;
        return { codeDigits: updated };
    }),
    resetCodeDigits: () => set({ codeDigits: ["", "", "", ""] }),
}));
