import React from "react";
import { Card, Statistic, Row, Col } from "antd";
import { 
  ShoppingCartOutlined, 
  DollarOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined 
} from "@ant-design/icons";
import type { OrderStats } from "../types";

interface OrderStatsCardProps {
  stats: OrderStats | null;
}

export const OrderStatsCard: React.FC<OrderStatsCardProps> = ({ stats }) => {
  // Backend-dən gələn datanı asan oxumaq üçün birbaşa dəyişkənə çıxarırıq (null olsa boş obyekt veririk)
  

  
  const data = stats || {};

    console.log(data)

  return (
    <Row gutter={10 } style={{ marginBottom: "24px" }}>
      {/* 1. Ümumi sifarişlər */}
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Ümumi sifarişlər</span>}
            value={data.TOTAL || 0}
            valueStyle={{ fontSize: "14px", fontWeight: "600" }}
            formatter={(value) => (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShoppingCartOutlined style={{ color: "#1890ff", fontSize: "18px" }} />
                <span>{value}</span>
              </div>
            )}
          />
        </Card>
      </Col>

      {/* 2. Ümumi satış məbləği */}
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Ümumi satış</span>}
            value={data.TOTAL_REVENUE || data.TOTAL_REVENUE || 0} // 👈 Backend-dən gələn uyğun açar söz
            precision={2}
            valueStyle={{ fontSize: "14px", fontWeight: "600" }}
            formatter={(value) => (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <DollarOutlined style={{ color: "#52c41a", fontSize: "14px" }} />
                <span>{value} ₼</span>
              </div>
            )}
          />
        </Card>
      </Col>

      {/* 3. Gözləyən */}
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Gözləyən</span>}
            value={data.PENDING || data.PENDING || 0} // 👈 Gözləyən sifarişlərin sayı
            valueStyle={{ fontSize: "14px", fontWeight: "600" }}
            formatter={(value) => (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ClockCircleOutlined style={{ color: "#faad14", fontSize: "18px" }} />
                <span>{value}</span>
              </div>
            )}
          />
        </Card>
      </Col>

      {/* 4. Hazırlanır */}
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Hazırlanır</span>}
            value={data.PREPARING || data.PREPARING || 0} // 👈 Hazırlanan sifarişlərin sayı
            valueStyle={{ fontSize: "14px", fontWeight: "600" }}
            formatter={(value) => (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ClockCircleOutlined style={{ color: "#722ed1", fontSize: "18px" }} />
                <span>{value}</span>
              </div>
            )}
          />
        </Card>
      </Col>

      {/* 5. Çatdırılan */}
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Çatdırılan</span>}
            value={data.DELIVERED || data.DELIVERED || 0} // 👈 Çatdırılan sifarişlərin sayı
            valueStyle={{ fontSize: "14px", fontWeight: "600" }}
            formatter={(value) => (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircleOutlined style={{ color: "#52c41a", fontSize: "18px" }} />
                <span>{value}</span>
              </div>
            )}
          />
        </Card>
      </Col>

      {/* 6. Ləğv edilən */}
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Ləğv edilən</span>}
            value={data.cancelledOrders || data.cancelled || 12} // 👈 Ləğv edilən sifarişlərin sayı
            valueStyle={{ fontSize: "14px", fontWeight: "600" }}
            formatter={(value) => (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CloseCircleOutlined style={{ color: "#ff4d4f", fontSize: "18px" }} />
                <span>{value}</span>
              </div>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};