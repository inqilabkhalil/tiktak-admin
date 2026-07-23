import React from "react";
import { Table, Tag, Button } from "antd";
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
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  isLoading,
  onViewDetails,
}) => {
  // Ant Design Table sütunları - Daxili filter və sıralamalar ilə
  const columns: ColumnsType<Order> = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) => a.id - b.id, // Rəqəmlərə görə sıralama (böyükdən kiçiyə / kiçikdən böyüyə)
    },
    {
      title: "Tarix",
      dataIndex: "createdAt", // Və ya backend-də tarix hansı sahəkdədirsə
      key: "createdAt",
      sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(), // Tarix sıralaması
    },
    {
      title: "Çatdırılma ünvanı",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Məhsul sayı",
      dataIndex: "productCount", // Və ya uyğun field adı
      key: "productCount",
      sorter: (a: any, b: any) => a.productCount - b.productCount, // Məhsul sayına görə sıralama
    },
    {
      title: "Subtotal/Çatdırılma",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a: any, b: any) => a.totalAmount - b.totalAmount, // Məbləğə görə sıralama
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // Status sütunu üçün daxili filter siyahısı
      filters: [
        { text: "Gözləyir", value: "PENDING" },
        { text: "Təsdiqləndi", value: "APPROVED" },
        { text: "Çatdırıldı", value: "DELIVERED" },
        { text: "İmtina edildi / Ləğv", value: "CANCELLED" },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: string) => {
        let color = "geekblue";
        let text = status;
        if (status === "PENDING") { color = "gold"; text = "Gözləyir"; }
        else if (status === "APPROVED") { color = "green"; text = "Təsdiqləndi"; }
        else if (status === "CANCELLED") { color = "red"; text = "İmtina edildi"; }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Əməliyyat",
      key: "action",
      render: (_, record) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => onViewDetails(record)}>
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