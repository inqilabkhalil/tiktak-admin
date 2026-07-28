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
      title: "Order Nömrəsi",
      dataIndex: "orderNumber", // 👈 Səhv yazılışı (orderorderNumber) düzəltdik
      key: "orderNumber",
      sorter: (a, b) => (a.orderNumber > b.orderNumber ? 1 : -1),
    },
  {
      title: "Tarix",
      dataIndex: "createdAt",
      key: "createdAt",
      // 👇 Sırçalama üçün orijinal uzun tarixdən istifadə edirik
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      
      // 👇 Ekranda yalnız tarixi (məsələn: 2026-07-14) göstərmək üçün render əlavə edirik
      render: (createdAt: string) => {
        // createdAt varsa ilk 10 simvolunu götürürük (YYYY-MM-DD)
        const formattedDate = createdAt ? createdAt.slice(0, 10) : "";
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Çatdırılma ünvanı",
      dataIndex: "address",
      key: "address",
    },
   {
      title: "Məhsul Sayı",
      key: "quantity",
      // Burada items massivinin içindəki quantity-ləri cəmləyirik (və ya items.length yaza bilərsən)
      render: (_, record) => {
        const totalQuantity = record.items?.reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        ) || 0;
        return <span>{totalQuantity}</span>;
      },
      sorter: (a, b) => {
        const totalA = a.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
        const totalB = b.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
        return totalA - totalB;
      },
    },
    {
      title: "Çatdırılma",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => Number(a.total) - Number(b.total), // Məbləğə görə sıralama
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
      onFilter: (value, record) => record.status === value,
      render: (status: string) => {
        let color = "geekblue";
        let text = status;
        if (status === "PENDING") {
          color = "gold";
          text = "Gözləyir";
        } else if (status === "APPROVED") {
          color = "green";
          text = "Təsdiqləndi";
        } else if (status === "CANCELLED") {
          color = "red";
          text = "İmtina edildi";
        }
        return <Tag color={color}>{text}</Tag>;
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
