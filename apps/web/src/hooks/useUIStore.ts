import { create } from "zustand";

interface UIStoreProps {
  isSidebarOpened: boolean;
  setIsSidebarOpened: (value: boolean) => void;
}

export const useUIStore = create<UIStoreProps>((set) => ({
  isSidebarOpened: false,
  setIsSidebarOpened: (value: boolean) => set({ isSidebarOpened: value }),
}));
