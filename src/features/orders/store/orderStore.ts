import { create } from "zustand";
import { orderService } from "../services/orderService";
import type { OrdersResponse, OrderStats, Order } from "../types";

interface OrderState {
  orders: OrdersResponse | null;
  selectedOrder: Order | null;
  stats: OrderStats | null;
  isLoading: boolean;
  error: string | null;

  fetchOrders: (page?: number, limit?: number, status?: string  ,items?: number | string) => Promise<void>;
  fetchOrderById: (id: number | string) => Promise<void>;
  fetchStats: () => Promise<void>;
  updateOrderStatus: (id:number |string , status:string) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: null,
  selectedOrder: null,
  stats: null,
  isLoading: false,
  error: null,

  // Ümumi siyahını çəkmək üçün
  fetchOrders: async (page, limit, status,) => {
    set({ isLoading: true, error: null });
    try {
      const data = await orderService.getOrders(page, limit, status);
      set({ orders: data, isLoading: false });
    } catch {
      set({ error: 'Sifarişləri yükləmək mümkün olmadı', isLoading: false });
    }
  },

  // Tək bir sifarişin detallarını ID-yə görə çəkmək üçün
  fetchOrderById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await orderService.getOrderById(id);
      set({ selectedOrder: data, isLoading: false });
    } catch {
      set({ error: 'Sifariş detallarını yükləmək mümkün olmadı', isLoading: false });
    }
  },

  // Statistikaları çəkmək üçün
  fetchStats: async () => {
    try {
      const data = await orderService.getStats();
      set({ stats: data });
    } catch (err) {
      console.error("Statistika xətası:", err);
    }
  },

updateOrderStatus: async (id, status) => {
  try {
    await orderService.updateOrderStatus(id, status);

    // Status dəyişdikdən sonra siyahını yenidən çəkirik
    const data = await orderService.getOrders(1, 5);

    set({
      orders: data,
      error: null,
    });
  } catch (error) {
    console.error("Status dəyişdirilə bilmədi:", error);

    set({
      error: "Status dəyişdirilə bilmədi",
    });
  }
},

}));