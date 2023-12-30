import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Counter', useCounterStore);
}
