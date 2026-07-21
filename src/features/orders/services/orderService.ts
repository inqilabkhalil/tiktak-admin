import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'Məlumatları yükləmək mümkün olmadı'



export const api = axios.create({
  baseURL: API_URL,
});

// Request Interceptor - Tokeni hər sorğuya avtomatik əlavə edir
api.interceptors.request.use(
  (config) => {
    // Postman-də işlətdiyiniz tokenin localStorage-dəki açar adı
    const token = localStorage.getItem("ACCESS TOKEN");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const orderService = {
  getOrders: async (page = 1, limit = 5, status?: string) => {
    const response = await api.get("/orders/admin", {
      params: { page, limit, status },
    });
    return response.data;
  },

getStats: async () => {
    const response = await api.get("/orders/admin/stats"); // Sonda /stats mütləq olmalıdır!
    return response.data;
  },
};