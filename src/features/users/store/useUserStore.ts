import { create } from 'zustand';
import type { UserState } from '../types/users';
import { fetchUsers } from '../services/usersService';

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });

    try {
      const data = await fetchUsers();
      set({ users: data });
    } catch {
      set({ error: 'Məlumatları yükləmək mümkün olmadı' });
    } finally {
      set({ loading: false });
    }
  },
}));
