import { create } from "zustand";

type Store = {
  user: {};
  setUser: (user: any) => void;
  getUser: () => void;
};

const useUserStore = create<Store>((set, get) => ({
  user: {},
  setUser: (user) => set({ user }),
  getUser: () => get().user,
}));

export default useUserStore;
