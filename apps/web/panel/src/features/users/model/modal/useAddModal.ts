import { create } from "zustand";

type UsersStore = {
    barcode: string;
    setBarcode: (value: string) => void;

    name: string;
    setName: (value: string) => void;

    surname: string;
    setSurname: (value: string) => void;

    group: string;
    setGroup: (value: string) => void;

    resetForm: () => void;
};

export const useAddModal = create<UsersStore>((set) => ({

    barcode: "",
    setBarcode: (value) => set({ barcode: value }),

    name: "",
    setName: (value) => set({ name: value }),

    surname: "",
    setSurname: (value) => set({ surname: value }),

    group: "",
    setGroup: (value) => set({ group: value }),

    resetForm: () =>
        set({
            barcode: "",
            name: "",
            surname: "",
            group: "",
        }),
}));
