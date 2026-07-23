import api from "@/shared/services/api";
import type { Category, CategoryPayload } from "../types/categories";

//GET
export const fetchCategories = async (): Promise<Category[]> => {
    const response = await api.get('/admin/categories');
    return response.data.data;
};

//POST
export const createCategory = async (data: CategoryPayload): Promise<Category> => {
    const response = await api.post('/admin/category', data);
    return response.data.data;
};

//PUT
export const updateCategory = async (
    id: number,
    data: CategoryPayload
): Promise<Category> => {
    const response = await api.put(`/admin/categories/${id}`, data);
    return response.data.data;
};

//DELETE
export const deleteCategory = async (id: number): Promise<void> => {
    await api.delete(`/admin/categories/${id}`);
};