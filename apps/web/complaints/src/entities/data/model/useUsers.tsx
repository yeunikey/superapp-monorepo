import { User } from '../types/user';
import { create } from 'zustand';

type UsersState = {
    users: User[];
    setUsers: (users: User[]) => void;
};

export const useUsers = create<UsersState>((set) => ({

    users: [],
    setUsers: (users) => set({ users }),

}));
