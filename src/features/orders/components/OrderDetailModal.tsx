import React from "react";
import { Modal, Descriptions, List, Avatar } from "antd";
import type { Order } from "../types";


interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ visible, order, onClose }) => {
  if (!order) return null;

  return (
    <Modal
      title={`Sifariş Detalı: ORD-${order.id}`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Descriptions bordered column={2} size="small" style={{ marginBottom: "20px" }}>
        <Descriptions.Item label="Müştəri">{order.user?.full_name}</Descriptions.Item>
        <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
        <Descriptions.Item label="Ümumi Məbləğ">{order.total_price} ₼</Descriptions.Item>
        <Descriptions.Item label="Tarix">{new Date(order.created_at).toLocaleString()}</Descriptions.Item>
      </Descriptions>

      <h4>Sifariş olunan məhsullar:</h4>
      <List
        itemLayout="horizontal"
        dataSource={order.items}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.product.img_url} shape="square" size={50} />}
              title={item.product.title}
              description={`Qiymət: ${item.product.price} ₼ | Say: ${item.quantity}`}
            />
            <div>Cəmi: {item.total_price} ₼</div>
          </List.Item>
        )}
      />
    </Modal>
  );
};