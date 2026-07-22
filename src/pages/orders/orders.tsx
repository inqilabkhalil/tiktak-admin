import { OrderModal } from "@/features/orders/components/OrderDetailModal";
import { OrderStatsCard } from "@/features/orders/components/OrderStatsCards";
import { OrdersTable } from "@/features/orders/components/OrderTable";
import { useOrderStore } from "@/features/orders/store/orderStore";
import type { Order } from "@/features/orders/types";
import React, { useEffect, useState } from "react";

export const OrdersPage: React.FC = () => {
  const { orders, stats, isLoading, fetchOrders, fetchStats } = useOrderStore();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  
  // Modal üçün state-lər
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchOrders(page, limit);
    fetchStats();
  }, [page, limit]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  return (
    <div style={{ padding: "25px", background: "white", borderRadius: "10px", minHeight: "100vh", width: "95%",}}>
      <h2 style={{ marginBottom: "24px", fontWeight: 600, fontSize:'32px' , position: "relative", bottom:'30px' }}>Sifarişlər</h2>

      {/* 1. Statistika Kartları Komponenti */}
      <OrderStatsCard stats={stats} />

      {/* 2. Cədvəl Komponenti */}
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
      />

      {/* 3. Detal Modalı Komponenti */}
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};