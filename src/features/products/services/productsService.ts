import type { Product } from '../types/products';
import { mockProducts } from '../utils/mockProducts';

const FAKE_DELAY = 500;

export const fetchProducts = (): Promise<Product[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), FAKE_DELAY);
  });

export const deleteProduct = (id: number): Promise<void> =>
  new Promise((resolve) => {
    console.log(`Fake API: deleting product ${id}`);
    setTimeout(() => resolve(), FAKE_DELAY);
  });
