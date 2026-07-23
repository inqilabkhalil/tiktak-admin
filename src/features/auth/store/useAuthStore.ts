import { create } from 'zustand';
import { login as loginService } from '../services/authService';
import type { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,

  login: async (payload) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await loginService(payload);

      localStorage.setItem('access_token', data.tokens.access_token);

      localStorage.setItem('refresh_token', data.tokens.refresh_token);
    } catch {
      set({
        error: 'Telefon və ya parol yanlışdır',
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
