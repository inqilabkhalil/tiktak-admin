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
        <Card variant="borderless" style={{ borderRadius: "8px" }}>
          <Statistic
            title="Ümumi sifarişlər"
            value={stats?.data?.totalOrders || 0}
            prefix={<ShoppingCartOutlined style={{ color: "#1890ff" }} />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px" }}>
          <Statistic
            title="Ümumi satış"
            value={0}
            precision={2}
            prefix={<DollarOutlined style={{ color: "#52c41a" }} />}
            suffix="₼"
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px" }}>
          <Statistic
            title="Gözləyən"
            value={0}
            prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px" }}>
          <Statistic
            title="Hazırlanır"
            value={0}
            prefix={<ClockCircleOutlined style={{ color: "#722ed1" }} />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px" }}>
          <Statistic
            title="Çatdırılan"
            value={0}
            prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card variant="borderless" style={{ borderRadius: "8px" }}>
          <Statistic
            title="Ləğv edilən"
            value={0}
            prefix={<CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
          />
        </Card>
      </Col>
    </Row>
  );
};