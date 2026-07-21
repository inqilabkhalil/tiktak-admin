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
  return (
    <Row gutter={16} style={{ marginBottom: "24px" }}>
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Ümumi sifarişlər</span>}
            value={stats?.data?.totalOrders || 0}
            valueStyle={{ fontSize: "20px", fontWeight: "600" }}
            formatter={(value) => (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShoppingCartOutlined style={{ color: "#1890ff", fontSize: "18px" }} />
                <span>{value}</span>
              </div>
            )}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Ümumi satış</span>}
            value={0}
            precision={2}
            valueStyle={{ fontSize: "20px", fontWeight: "600" }}
            formatter={(value) => (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <DollarOutlined style={{ color: "#52c41a", fontSize: "18px" }} />
                <span>{value} ₼</span>
              </div>
            )}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Gözləyən</span>}
            value={0}
            valueStyle={{ fontSize: "20px", fontWeight: "600" }}
            formatter={(value) => (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ClockCircleOutlined style={{ color: "#faad14", fontSize: "18px" }} />
                <span>{value}</span>
              </div>
            )}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Hazırlanır</span>}
            value={0}
            valueStyle={{ fontSize: "20px", fontWeight: "600" }}
            formatter={(value) => (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ClockCircleOutlined style={{ color: "#722ed1", fontSize: "18px" }} />
                <span>{value}</span>
              </div>
            )}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Çatdırılan</span>}
            value={0}
            valueStyle={{ fontSize: "20px", fontWeight: "600" }}
            formatter={(value) => (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircleOutlined style={{ color: "#52c41a", fontSize: "18px" }} />
                <span>{value}</span>
              </div>
            )}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px", minHeight: "115px" }}>
          <Statistic
            title={<span style={{ fontSize: "13px" }}>Ləğv edilən</span>}
            value={0}
            valueStyle={{ fontSize: "20px", fontWeight: "600" }}
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