import { create } from "zustand";

import type { OrdersResponse, OrderStats } from "../types";
import { orderService } from "../services/orderService";


interface OrderState {
  orders: OrdersResponse | null;
  stats: OrderStats | null;
  isLoading: boolean;
  error: string | null;
  fetchOrders: (page?: number, limit?: number, status?: string) => Promise<void>;
  fetchStats: () => Promise<void>;
}

// useOrderStore budur:
export const useOrderStore = create<OrderState>((set) => ({
  orders: null,
  stats: null,
  isLoading: false,
  error: null,

  fetchOrders: async (page, limit, status) => {
    set({ isLoading: true, error: null });
    try {
      const data = await orderService.getOrders(page, limit, status);
      set({ orders: data, isLoading: false });
      console.log("API-dən gələn xam data:", data);
    } catch (err:any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchStats: async () => {
    try {
      const data = await orderService.getStats();
      set({ stats: data });
    } catch (err: any) {
      console.error(err);
    }
  },
}));