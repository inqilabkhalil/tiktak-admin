import React from "react";
import { Modal, Descriptions, List, Avatar, Tag } from "antd";
import type { Order, OrderItem } from "../types";

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ visible, order, onClose }) => {
  if (!order) return null;

  return (
    <Modal
      title={`Sifariş Detalı: ${order.orderNumber}`} // 👈 Real orderNumber-i göstəririk
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      {/* Əsas məlumatlar bloku */}
      <Descriptions bordered column={2} size="small" style={{ marginBottom: "20px" }}>
        <Descriptions.Item label="Sifariş Nömrəsi">{order.orderNumber}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color="blue">{order.status}</Tag>
        </Descriptions.Item>
        
        <Descriptions.Item label="Müştəri">{order.user?.full_name || "Naməlum"}</Descriptions.Item>
        <Descriptions.Item label="Əlaqə nömrəsi">{order.phone || "Qeyd olunmayıb"}</Descriptions.Item>
        
        <Descriptions.Item label="Çatdırılma ünvanı">{order.address}</Descriptions.Item>
        <Descriptions.Item label="Ödəniş üsulu">
          <Tag color="green">{order.paymentMethod}</Tag>
        </Descriptions.Item>
        
        <Descriptions.Item label="Çatdırılma haqqı">{order.deliveryFee} ₼</Descriptions.Item>
        <Descriptions.Item label="Ümumi Məbləğ"><b>{order.total} ₼</b></Descriptions.Item>
        
        <Descriptions.Item label="Sifariş tarixi" span={2}>
          {new Date(order.createdAt).toLocaleString()}
        </Descriptions.Item>

        {order.note && (
          <Descriptions.Item label="Müştəri qeydi" span={2}>
            {order.note}
          </Descriptions.Item>
        )}
      </Descriptions>

      {/* Sifariş olunan məhsulların siyahısı */}
      <h4>Sifariş olunan məhsullar:</h4>
      <List
        itemLayout="horizontal"
        dataSource={order.items || []}
        renderItem={(item: OrderItem) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.product?.img_url} shape="square" size={50} />}
              title={item.product?.title}
              description={`Qiymət: ${item.product?.price} ₼ | Say: ${item.quantity} ${item.product?.type || ""}`}
            />
            <div><b>Cəmi: {item.total_price} ₼</b></div>
          </List.Item>
        )}
      />
    </Modal>
  );
};