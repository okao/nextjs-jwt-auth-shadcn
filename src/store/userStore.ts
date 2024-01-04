import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  provider: string;
  socialId?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  status?: {
    id?: number;
    name?: string;
  };
}

interface GenerationState {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
  getUser: () => User;
}

export const useUserStore: any = create<GenerationState>((set) => ({
  user: {} as User,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: {} as User }),
  getUser: () => useUserStore.getState().user,
}));
