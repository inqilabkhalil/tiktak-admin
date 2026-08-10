import api from "@/shared/services/api";

export const orderService = {
  // 1. Ümumi sifarişlərin siyahısı (səhifələmə və s. ilə)
  getOrders: async (page = 1, limit = 5, status?: string) => {
    const response = await api.get("/orders/admin", {
      params: { page, limit, status, },
      
    });
  
    return response.data;
  },

  // 2. ID-yə görə tək bir sifarişin detalları
  getOrderById: async (id: number | string) => {
    const response = await api.get(`/orders/admin/${id}`);
    


    return response.data;
  },

  // 3. Statistika üçün
  getStats: async () => {
    const response = await api.get("/orders/admin/stats");
    return response.data;
  },


updateOrderStatus: async (id: number | string, status: string) => {
  const response = await api.put(
    `/orders/admin/${id}/status`,
    {
      status,
    }
  );

  return response.data;
},
};