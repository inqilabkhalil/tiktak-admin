import { create } from 'zustand';
import type { UserState } from '../types/users';
import { fetchUsers } from '../services/usersService';

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    console.log('STORE: fetchAll başladı');

    set({ loading: true, error: null });

    try {
      const data = await fetchUsers();
      console.log('STORE DATA:', data);

      set({ users: data });
    } catch (err) {
      console.log('STORE ERROR:', err);
      set({ error: 'Məlumatları yükləmək mümkün olmadı' });
    } finally {
      set({ loading: false });
    }
  },
}));
