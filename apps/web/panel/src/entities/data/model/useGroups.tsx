import { Group } from '../types/group';
import { create } from 'zustand';

type GroupsState = {
    groups: Group[];
    setGroups: (users: Group[]) => void;
};

export const useGroups = create<GroupsState>((set) => ({

    groups: [],
    setGroups: (groups) => set({ groups: groups }),

}));
