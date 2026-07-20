import React from 'react';
import styles from './OrderPagination.module.css';
import { useStore } from '@/shared/store';
import type { OrderState } from '../../types/order.types';





export const OrderPagination: React.FC = () => {
  
const pagination = useStore((state: OrderState) => state.pagination);
const setPage = useStore((state: OrderState) => state.setPage);
const setLimit = useStore((state: OrderState) => state.setLimit);

  const pages = [1, 2, 3, 4, 5, '...', 19];

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.resultsText}>
        1-{pagination.limit} / {pagination.totalResults} nəticə
      </div>
      <div className={styles.paginationControls}>
        <button className={styles.pageArrow} onClick={() => setPage(Math.max(1, pagination.currentPage - 1))}>&lt;</button>
        {pages.map((p, index) => (
          <button
            key={index}
            className={`${styles.pageBtn} ${pagination.currentPage === p ? styles.active : ''} ${p === '...' ? styles.dots : ''}`}
            onClick={() => typeof p === 'number' && setPage(p)}
          >
            {p}
          </button>
        ))}
        <button className={styles.pageArrow} onClick={() => setPage(pagination.currentPage + 1)}>&gt;</button>
      </div>
      <div className={styles.limitSelector}>
        <select value={pagination.limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
        </select>
      </div>
    </div>
  );
};


