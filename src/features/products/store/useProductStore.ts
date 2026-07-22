import { create } from 'zustand';
import type { ProductState } from '../types/products';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productsService';

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchProducts();
      set({ products: data });
    } catch {
      set({ error: 'Məlumatları yükləmək mümkün olmadı' });
    } finally {
      set({ loading: false });
    }
  },
  add: async (data) => {
    set({ loading: true, error: null });
    try {
      await createProduct(data);
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
      await updateProduct(id, data);
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
      await deleteProduct(id);
      await get().fetchAll();
    } catch {
      set({ error: 'Silmək mümkün olmadı' });
    } finally {
      set({ loading: false });
    }
  },
}));