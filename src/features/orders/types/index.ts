// Sifariş statusları üçün enum (erasableSyntaxOnly `enum` açarına icazə vermir, ona görə const-obyekt istifadə olunur)
export const OrderStatus = {
  GOZLEYIR: 'gözləyir',
  TESDIQLENDI: 'təsdiqləndi',
  HAZIRLANIR: 'hazırlanır',
  HAZIRDIR: 'hazırdır',
  CATDIRILDI: 'çatdırıldı',
  LEGV_EDILDI: 'ləğv edildi',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

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
  orderNumber: string;
  status: OrderStatus | string; // Burada yuxarıdakı status tipini istifadə edirik
  total: string;
  deliveryFee: string;
  paymentMethod: string;
  note: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
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
  TOTAL: number;
  TOTAL_REVENUE: number;
  PENDING: number;
  PREPARING: number;
  DELIVERED: number;
}