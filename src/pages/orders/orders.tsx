import { OrderModal } from "@/features/orders/components/OrderDetailModal";
import { OrderStatsCard } from "@/features/orders/components/OrderStatsCards";
import { OrdersTable } from "@/features/orders/components/OrderTable";
import { useOrderStore } from "@/features/orders/store/orderStore";
import { useSearchStore } from "@/shared/store/useSearchStore";
import type { Order, OrdersResponse } from "@/features/orders/types";
import { Loader } from "@/shared/components/Loader";
import React, { useEffect, useMemo, useState } from "react";

export const OrdersPage: React.FC = () => {
  const orders = useOrderStore((state) => state.orders);
  const stats = useOrderStore((state) => state.stats);
  const isLoading = useOrderStore((state) => state.isLoading);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);
  const fetchStats = useOrderStore((state) => state.fetchStats);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const searchTerm = useSearchStore((s) => s.searchTerm);
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

  const filteredOrders = useMemo(() => {
    if (!orders) return null;
    if (!searchTerm.trim()) return orders;
    const lower = searchTerm.toLowerCase();
    const list = (orders.data as unknown as Order[]) || [];
    const filteredList: Order[] = list.filter((o: Order) =>
      o.orderNumber?.toLowerCase().includes(lower) ||
      o.address?.toLowerCase().includes(lower) ||
      o.status?.toLowerCase().includes(lower)
    );

    return {
      ...orders,
      data: filteredList as unknown as OrdersResponse['data'],
    };
  }, [orders, searchTerm]);


  return (
    <div
      style={{
        padding: "15px",
        background: "white",
        borderRadius: "10px",
        minHeight: "100vh",
        width: "95%",
      }}
    >
      <h2
        style={{
          marginBottom: "24px",
          fontWeight: 600,
          fontSize: "32px",
          position: "relative",
          bottom: "16px",
          right: "8px",
        }}
      >
        Sifarişlər
      </h2>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* 1. Statistika Kartları Komponenti */}
          <OrderStatsCard stats={stats} />

          {/* 3. Cədvəl Komponenti */}
          <OrdersTable
            orders={filteredOrders}
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
        </>
      )}

      {/* 4. Detal Modalı Komponenti */}
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};
