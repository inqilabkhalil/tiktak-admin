// Sifariş statusları üçün xüsusi tip (Union type)
export type OrderStatus = 'gozleyir' | 'tesdiqlenedi' | 'hazirlanir' | 'imtina' | string;

export interface Product {
  id: number;
  title: string;
  img_url: string;
  description: string;
  price: string;
  type: string;
  created_at: string;
  category: {
    id: number;
    name: string;
  };
}

export interface OrderItem {
  id: number;
  quantity: number;
  total_price: string;
  product: Product;
}

export interface OrderUser {
  id: number;
  full_name: string;
  img_url: string | null;
}

export interface Order {
  id: number;
  status: OrderStatus; // Burada yuxarıdakı status tipini istifadə edirik
  total_price: string;
  created_at: string;
  updated_at: string;
  user: OrderUser;
  items: OrderItem[];
}

export interface OrdersResponse {
  statusCode: number;
  message: string;
  result: boolean;
  data?: {
    orders: Order[];
    total: number;
  };
}

export interface OrderStats {
  statusCode: number;
  message: string;
  result: boolean;
  data?: {
    totalOrders?: number;
    pendingOrders?: number;
    completedOrders?: number;
  };
}