import { create } from 'zustand';
import { createOrderSlice, type OrderSliceState } from './slices/OrderSlice';

// Store-u yaradırıq və onun daxilindən hook-u ixrac edirik
export const useStore = create<OrderSliceState>()((set, get, store) => ({
  ...createOrderSlice(set, get, store),
}));