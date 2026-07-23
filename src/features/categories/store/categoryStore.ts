import { create } from 'zustand';
import type { CategoryState } from '../types/categories';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService';

export const useCategoryStore = create<CategoryState>((set, get) => ({

  categories: [],
  loading: false,
  error: null,


  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCategories();
      set({ categories: data });
    } catch {
      set({ error: 'Məlumatları yükləmək mümkün olmadı' });
    } finally {
      set({ loading: false });
    }
  },

  add: async (data) => {
    set({ loading: true });
    try {
      await createCategory(data);
      await get().fetchAll();
      return true;
    } catch {
      return false;
    } finally {
      set({ loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true });
    try {
      await updateCategory(id, data);
      await get().fetchAll();
      return true;
    } catch {
      return false;
    } finally {
      set({ loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true });
    try {
      await deleteCategory(id);
      await get().fetchAll();
      return true;
    } catch {
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));