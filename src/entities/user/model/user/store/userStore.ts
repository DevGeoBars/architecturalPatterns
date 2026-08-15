import { create } from 'zustand';

import type { IUserState } from './userState';

export const useUserStore = create<IUserState>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  clearCurrentUser: () => set({ currentUser: null }),
}));
