import { create, StateCreator } from 'zustand';
import {
  createJSONStorage,
  persist,
  PersistOptions,
} from 'zustand/middleware';

type AuthStore = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
};

type MyPersist = (
  config: StateCreator<AuthStore>,
  options: PersistOptions<AuthStore>
) => StateCreator<AuthStore>;

const useAuthStore = create<AuthStore, []>(
  (persist as MyPersist)(
    (set, get): AuthStore => ({
      accessToken: null,
      setAccessToken: (token: string) =>
        set((state) => ({ accessToken: token })),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
