import React from 'react';
import styles from './Order.module.css';
import { OrderStats } from '@/features/orders/components/OrderStats/OrderStats';
import { OrderFilters } from '@/features/orders/components/OrderFilters/OrderFilters';
import { OrderTable } from '@/features/orders/components/OrderTable/OrderTable';
import { OrderPagination } from '@/features/orders/components/OrderPagination/OrderPagination';

export const OrdersPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Sifarişlər</h1>
      <OrderStats />
      <div className={styles.tableCardWrapper}>
        <OrderFilters />
        <OrderTable />
        <OrderPagination />
      </div>
    </div>
  );
};