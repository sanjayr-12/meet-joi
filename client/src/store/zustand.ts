import { create } from "zustand";

type StoreState = {
  render: number;
  setRender: () => void;
};

const useStore = create<StoreState>((set) => ({
  render: 0,
  setRender: () => set((state) => ({ render: state.render + 1 })),
}));

export default useStore;
