import type { OrderState } from '@/features/orders/types/order.types';
import { create } from 'zustand';
import { createOrderSlice } from './slices/OrderSlice';

// Store-u yaradırıq və onun daxilindən hook-u ixrac edirik
export const useStore = create<OrderState>()((set, get, store) => ({
  ...createOrderSlice(set, get, store),
}));