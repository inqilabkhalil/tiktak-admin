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
    set({ loading: true, error: null });
    try {
      await createCategory(data);
      await get().fetchAll();
    } catch {
      set({ error: 'Əlavə etmək mümkün olmadı' });
    } finally {
      set({ loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateCategory(id, data);
      await get().fetchAll();
    } catch {
      set({ error: 'Yeniləmək mümkün olmadı' });
    } finally {
      set({ loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteCategory(id);
      await get().fetchAll();
    } catch {
      set({ error: 'Silmək mümkün olmadı' });
    } finally {
      set({ loading: false });
    }
  },
}));