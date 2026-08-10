import { OrderModal } from "@/features/orders/components/OrderDetailModal";
import { OrderStatsCard } from "@/features/orders/components/OrderStatsCards";
import { OrdersTable } from "@/features/orders/components/OrderTable";
import { useOrderStore } from "@/features/orders/store/orderStore";
import type { Order } from "@/features/orders/types";
import React, { useEffect, useState } from "react";

export const OrdersPage: React.FC = () => {
  const orders = useOrderStore((state) => state.orders);
  const stats = useOrderStore((state) => state.stats);
  const isLoading = useOrderStore((state) => state.isLoading);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);
  const fetchStats = useOrderStore((state) => state.fetchStats);
const updateOrderStatus = useOrderStore(
  (state) => state.updateOrderStatus
);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Filter UI hələ tətbiq olunmayıb, status filtri həmişə undefined-dır
  const [status] = useState<string | undefined>(undefined);

  // Modal üçün state-lər
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchOrders(page, limit, status);
  }, [page, limit, status, fetchOrders]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  return (
    <div style={{ padding: "15px", background: "white", borderRadius: "10px", minHeight: "100vh", width: "95%" }}>
      <h2 style={{ marginBottom: "24px", fontWeight: 600, fontSize: '32px', position: "relative", bottom: '16px',right:'8px' }}>Sifarişlər</h2>

      {/* 1. Statistika Kartları Komponenti */}
      <OrderStatsCard stats={stats} />

    

      {/* 3. Cədvəl Komponenti */}
<OrdersTable
  orders={orders}
  isLoading={isLoading}
  page={page}
  limit={limit}
  onPageChange={(p, l) => {
    setPage(p);
    setLimit(l);
  }}
  onViewDetails={handleViewDetails}
  onStatusChange={updateOrderStatus}
/>

      {/* 4. Detal Modalı Komponenti */}
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};