import React from "react";
import { Table, Tag, Button, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import type { Order, OrdersResponse } from "../types";


interface OrdersTableProps {
  orders: OrdersResponse | null;
  isLoading: boolean;
  page: number;
  limit: number;
  onPageChange: (page: number, pageSize: number) => void;
  onViewDetails: (order: Order) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  isLoading,
  page,
  limit,
  onPageChange,
  onViewDetails,
}) => {
  const renderStatusTag = (status: string) => {
    switch (status) {
      case "gozleyir":
        return <Tag color="gold">Gözləyir</Tag>;
      case "tesdiqlenedi":
        return <Tag color="blue">Təsdiqləndi</Tag>;
      case "hazirlanir":
        return <Tag color="purple">Hazırlanır</Tag>;
      case "imtina":
        return <Tag color="red">İmtina</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (id: number) => `ORD-${id}`,
    },
    {
      title: "Tarix",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Çatdırılma ünvanı",
      key: "address",
      render: () => "Xətai rayonu",
    },
    {
      title: "Məhsul sayı",
      dataIndex: "items",
      key: "items",
      render: (items: any[]) => items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
    },
    {
      title: "Subtotal/Çatdırılma",
      dataIndex: "total_price",
      key: "total_price",
      render: (price: string) => (
        <span>
          {price} ₼ · <span style={{ color: "green" }}>Pulsuz</span>
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => renderStatusTag(status),
    },
    {
      title: "Əməliyyat",
      key: "action",
      render: (_: any, record: Order) => (
        <Button 
          type="link" 
          icon={<EyeOutlined />} 
          onClick={() => onViewDetails(record)}
        >
          Göstər
        </Button>
      ),
    },
  ];

  return (
    <Card variant="borderless" style={{ borderRadius: "8px" }}>
      <Table
        dataSource={Array.isArray(orders) ? orders : []}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: limit,
          total: orders?.data?.total || 0,
          onChange: onPageChange,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
      />
    </Card>
  );
};