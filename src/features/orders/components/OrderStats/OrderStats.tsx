import React from 'react';

import styles from './OrderStats.module.css';
import { useStore } from '@/shared/store';
import type { OrderState } from '../../types/order.types';


export const OrderStats = () => {
  const stats = useStore((state: OrderState) => state.stats);


  return (
    <div className={styles.statsGrid}>
      <div className={styles.card}>
        <span className={styles.title}>Ümumi sifarişlər</span>
        <div className={styles.valueRow}><span className={styles.iconBlue}>🛒</span> <strong>{stats.totalOrders}</strong></div>
      </div>
      <div className={styles.card}>
        <span className={styles.title}>Ümumi satış</span>
        <div className={styles.valueRow}><span className={styles.iconGreen}>💲</span> <strong>{stats.totalSales}</strong><span className={styles.arrowUp}>↑</span></div>
      </div>
      <div className={styles.card}>
        <span className={styles.title}>Gözləyən</span>
        <div className={styles.valueRow}><span className={styles.iconOrange}>⏱</span> <strong>{stats.pending}</strong></div>
      </div>
      <div className={styles.card}>
        <span className={styles.title}>Hazırlanır</span>
        <div className={styles.valueRow}><span className={styles.iconPurple}>⏱</span> <strong>{stats.preparing}</strong></div>
      </div>
      <div className={styles.card}>
        <span className={styles.title}>Çatdırılan</span>
        <div className={styles.valueRow}><span className={styles.iconGreenCheck}>✔</span> <strong>{stats.delivering}</strong></div>
      </div>
      <div className={styles.card}>
        <span className={styles.title}>Ləğv edilən</span>
        <div className={styles.valueRow}><span className={styles.iconRed}>✖</span> <strong>{stats.cancelled}</strong></div>
      </div>
    </div>
  );
};