import axios from "axios";
import type { OrdersResponse, OrderStats } from "../types";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/tiktak";

export const orderServices = {
  getStats: async (): Promise<OrderStats> => {
    const response = await axios.get<OrderStats>(`${API_URL}/orders/stats`, {});
    return response.data;
  },

  getOrders: async (
    page: number,
    limit: number,
    status?: string,
  ): Promise<OrdersResponse> => {
    const response = await axios.get<OrdersResponse>(`${API_URL}/orders`, {
        params:{page,limit, status}
    });

    return response.data;
  },
};
