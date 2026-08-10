import React from "react";
import { Table, Select, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Order } from "../types";
import { EyeOutlined } from "@ant-design/icons";

interface OrdersTableProps {
  orders: any;
  isLoading: boolean;
  page: number;
  limit: number;
  onPageChange: (page: number, limit: number) => void;
  onViewDetails: (order: Order) => void;
  onStatusChange: (id: number, status: string) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  isLoading,
  onViewDetails,
  onStatusChange,
}) => {
  const columns: ColumnsType<Order> = [
    {
      title: "Order Nömrəsi",
      dataIndex: "orderNumber",
      key: "orderNumber",

      sorter: (a, b) =>
        a.orderNumber > b.orderNumber ? 1 : -1,
    },

    {
      title: "Tarix",
      dataIndex: "createdAt",
      key: "createdAt",

      sorter: (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime(),

      render: (createdAt: string) => {
        const formattedDate = createdAt
          ? createdAt.slice(0, 10)
          : "";

        return <span>{formattedDate}</span>;
      },
    },

  {
  title: "Çatdırılma ünvanı",
  dataIndex: "address",
  key: "address",
  render: (address: string) =>
    address.length > 20
      ? address.slice(0, 11) + "..."
      : address,
},

    {
      title: "Məhsul Sayı",
      key: "quantity",

      render: (_, record) => {
        const totalQuantity =
          record.items?.reduce(
            (sum, item) => sum + (item.quantity || 0),
            0
          ) || 0;

        return totalQuantity;
      },

      sorter: (a, b) => {
        const totalA =
          a.items?.reduce(
            (sum, i) => sum + i.quantity,
            0
          ) || 0;

        const totalB =
          b.items?.reduce(
            (sum, i) => sum + i.quantity,
            0
          ) || 0;

        return totalA - totalB;
      },
    },

    {
      title: "Çatdırılma",
      dataIndex: "total",
      key: "total",

      sorter: (a, b) =>
        Number(a.total) - Number(b.total),
    },

    // STATUS
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status: string, record) => {
        return (
          <Select
            value={status}
            style={{ width: 150 }}
            onChange={(newStatus) => {
              onStatusChange(record.id, newStatus);
            }}
            options={[
              {
                label: "Gözləyir",
                value: "PENDING",
              },
              {
                label: "Təsdiqlənib",
                value: "CONFIRMED",
              },
              {
                label: "Hazırlanır",
                value: "PREPARING",
              },
              {
                label: "Hazır",
                value: "READY",
              },
              {
                label: "Çatdırılıb",
                value: "DELIVERED",
              },
              {
                label: "Ləğv edilib",
                value: "CANCELLED",
              },
            ]}
          />
        );
      },
    },

    {
      title: "Əməliyyat",
      key: "action",

      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => onViewDetails(record)}
        >
          Bax
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={orders?.data || []}
      columns={columns}
      loading={isLoading}
      rowKey="id"
      pagination={{
        pageSize: 5,
        total: orders?.total || 0,
      }}
    />
  );
};