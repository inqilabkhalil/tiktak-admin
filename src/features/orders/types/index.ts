

export interface Order {
  id: string;
  customerName: string;
  totalPrice: number;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
}


export interface OrdersResponse {
     data: Order[];
     total : number;
}

export interface OrderStats {
  totalCount: number;      
  pendingCount: number;    
  completedCount: number;  
  cancelledCount: number;  
}