import api from "@/shared/services/api";
import type { Product, ProductPayload } from "../types/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get('/admin/products'); // cəm
  return response.data.data;
};

export const createProduct = async (data: ProductPayload): Promise<Product> => {
  const response = await api.post('/admin/product', data);
  return response.data.data;
};

export const updateProduct = async (
  id: number,
  data: ProductPayload
): Promise<Product> => {
  const response = await api.put(`/admin/products/${id}`, data); // cəm
  return response.data.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/admin/products/${id}`); // cəm
};