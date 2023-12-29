import { create } from 'zustand';

interface MainState {
  isSuperMode: boolean;
  setSuperMode: (value: boolean) => void;
  isSideMenuOpen: boolean;
  setSideMenuOpen: (isOpen: boolean) => void;
}

export const useMainStore = create<MainState>(set => ({
  isSuperMode: false,
  setSuperMode: (value: boolean) => {
    set(() => ({ isSuperMode: value }));
  },
  isSideMenuOpen: false,
  setSideMenuOpen: (isOpen: boolean) => {
    set(() => ({ isSideMenuOpen: isOpen }));
  },
}));
