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
      sorter: (a: any, b: any) => {
        // Əgər nömrə rəqəmsdirsə və ya string-dirsə müqayisə edirik
        return (a.orderNumber || 0) > (b.orderNumber || 0) ? 1 : -1;
      },
    },
  {
      title: "Tarix",
      dataIndex: "createdAt",
      key: "createdAt",
      // 👇 Sırçalama üçün orijinal uzun tarixdən istifadə edirik
      sorter: (a: any, b: any) =>
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
      render: (_, record: any) => {
        const totalQuantity = record.items?.reduce(
          (sum: number, item: any) => sum + (item.quantity || 0),
          0
        ) || 0;
        return <span>{totalQuantity}</span>;
      },
      sorter: (a: any, b: any) => {
        const totalA = a.items?.reduce((sum: number, i: any) => sum + i.quantity, 0) || 0;
        const totalB = b.items?.reduce((sum: number, i: any) => sum + i.quantity, 0) || 0;
        return totalA - totalB;
      },
    },
    {
      title: "Çatdırılma",
      dataIndex: "total",
      key: "total",
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
