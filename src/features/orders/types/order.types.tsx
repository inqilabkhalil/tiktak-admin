export type OrderStatus = 'Gözləyir' | 'Təsdiqləndi' | 'Çatdırıldı' | 'Ləğv edildi';

export interface Order {
  id: string;
  date: string;
  address: string;
  count: number;
  price: string;
  deliveryType: string;
  status: OrderStatus;
}

export interface OrderStatsData {
  totalOrders: number;
  totalSales: number;
  pending: number;
  preparing: number;
  delivering: number;
  cancelled: number;
}

export interface OrderState {
  orders: Order[];
  stats: OrderStatsData;
  filters: {
    search: string;
    status: string;
  };
  sorting: {
    field: string;
    direction: 'asc' | 'desc';
  };
  pagination: {
    currentPage: number;
    limit: number;
    totalResults: number;
  };
  setOrders: (orders: Order[]) => void;
  setFilter: (key: string, value: string) => void;
  setSorting: (field: string, direction: 'asc' | 'desc') => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}