import type { Product } from '../types/products';
import { mockProducts } from '../utils/mockProducts';

const FAKE_DELAY = 500;

export const fetchProducts = (): Promise<Product[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), FAKE_DELAY);
  });

export const deleteProduct = (id: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const index = mockProducts.findIndex((product) => product.id === id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
      }
      resolve();
    }, FAKE_DELAY);
  });
