import type { OrderState } from '@/features/orders/types/order.types';
import type { StateCreator } from 'zustand';





export const createOrderSlice: StateCreator<OrderState> = (set) => ({
  orders: [
    { id: 'ORD-2026-01', date: '11-02', address: 'Xetai rayonu', count: 5, price: '11.99', deliveryType: 'Pulsuz', status: 'Gözləyir' },
    { id: 'ORD-2026-02', date: '11-02', address: 'xetai rayonu', count: 8, price: '21.99', deliveryType: 'Pulsuz', status: 'Gözləyir' },
    { id: 'ORD-2026-03', date: '29-01', address: 'Ağaneymatullah 40', count: 3, price: '1502.00', deliveryType: 'Pulsuz', status: 'Gözləyir' },
    { id: 'ORD-2026-04', date: '18-12', address: 'Xetai rayonu', count: 2, price: '9.99', deliveryType: 'Pulsuz', status: 'Təsdiqləndi' },
    { id: 'ORD-2026-05', date: '17-12', address: 'Mamun', count: 1, price: '7.99', deliveryType: 'Pulsuz', status: 'Çatdırıldı' },
  ],
  stats: {
    totalOrders: 92,
    totalSales: 6234.35,
    pending: 53,
    preparing: 6,
    delivering: 10,
    cancelled: 0
  },
  filters: { search: '', status: 'all' },
  sorting: { field: 'No', direction: 'asc' },
  pagination: { currentPage: 1, limit: 5, totalResults: 92 },

  setOrders: (orders) => set({ orders }),
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value },
    pagination: { ...state.pagination, currentPage: 1 }
  })),
  setSorting: (field, direction) => set({ sorting: { field, direction } }),
  setPage: (page) => set((state) => ({
    pagination: { ...state.pagination, currentPage: page }
  })),
  setLimit: (limit) => set((state) => ({
    pagination: { ...state.pagination, limit, currentPage: 1 }
  }))
});