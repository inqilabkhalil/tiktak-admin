import React from 'react';
import styles from './OrderFilters.module.css';

export const OrderFilters: React.FC = () => {
  return (
    <div className={styles.filterHeader}>
      <div className={styles.thItem}>No <span className={styles.sortIcons}>↕ ▾</span></div>
      <div className={styles.thItem}>Tarix <span className={styles.sortIcons}>↕ ▾</span></div>
      <div className={styles.thItem}>Çatdırılma ünvanı <span className={styles.sortIcons}>↕ ▾</span></div>
      <div className={styles.thItem}>Məhsul sayı <span className={styles.sortIcons}>↕ ▾</span></div>
      <div className={styles.thItem}>Subtotal/Çatdırılma <span className={styles.sortIcons}>↕ ▾</span></div>
      <div className={styles.thItem}>Status <span className={styles.sortIcons}>↕ ▾</span></div>
      <div className={styles.thItem}>Əməliyyat</div>
    </div>
  );
};