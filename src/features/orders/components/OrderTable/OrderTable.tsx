import React from "react";

import styles from "./OrderTable.module.css";


import type { OrderState, OrderStatus } from "../../types/order.types";
import { useStore } from "@/shared/store";

export const OrderTable: React.FC = () => {
  // (state: StoreState) tipini birbaşa göstərməklə TypeScript-in tip qeyri-müəyyənliyini aradan qaldırırıq
const orders = useStore((state: OrderState) => state.orders);


  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "Gözləyir":
        return styles.badgePending;
      case "Təsdiqləndi":
        return styles.badgeApproved;
      case "Çatdırıldı":
        return styles.badgeDelivered;
      default:
        return styles.badgeDefault;
    }
  };

  return (
    <div className={styles.tableScrollContainer}>
      <div className={styles.tableWrapper}>
        {orders.map((order) => (
          <div key={order.id} className={styles.tableRow}>
            <div className={styles.cell}>
              <strong>{order.id}</strong>
            </div>
            <div className={styles.cell}>{order.date}</div>
            <div className={styles.cell}>{order.address}</div>
            <div className={styles.cell}>{order.count}</div>
            <div className={styles.cell}>
              {order.price} ₼{" "}
              <span className={styles.freeText}>• {order.deliveryType}</span>
            </div>
            <div className={styles.cell}>
              <span
                className={`${styles.badge} ${getStatusBadge(order.status)}`}
              >
                {order.status}
              </span>
            </div>
            <div className={styles.cell}>
              <button className={styles.actionBtn}>👁 Göstər</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
