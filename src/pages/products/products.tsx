

import { useState } from 'react';
import styles from './products.module.css';

interface Product {
  id: string;
  order: number;
  image: string;
  title: string;
  description: string;
  price: string;
  category: string;
  type: string;
  date: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    order: 1,
    image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=100',
    title: 'Bağ Pomidoru',
    description: 'Təbii şəkildə yetişdirilmiş bağ pomidorları. Yeməklə...',
    price: '2.00',
    category: 'Spor ve Aciq Hava',
    type: 'Kiloqram',
    date: '03.08.2025',
  },
  {
    id: '2',
    order: 2,
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=100',
    title: 'Təbii Xiyar',
    description: 'Sulu, təzə və pestisidsiz xiyarlar. Salatlar və...',
    price: '1.20',
    category: 'Meyveler ve terevezler',
    type: 'Kiloqram',
    date: '03.08.2025',
  },
  {
    id: '3',
    order: 3,
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=100',
    title: 'Suvarma Sistemi',
    description: 'Bitkilərinizi vaxtında və düzgün suvarmaq üçün...',
    price: '500.00',
    category: 'Ev ve Bahce',
    type: 'Ədəd',
    date: '03.08.2025',
  },
  {
    id: '4',
    order: 4,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100',
    title: 'Mebel Dəsti',
    description: 'Yaz günlərini daha komfortlu keçirmək üçün...',
    price: '1000.00',
    category: 'Ev ve Bahce',
    type: 'Ədəd',
    date: '03.08.2025',
  },
  {
    id: '5',
    order: 5,
    image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=100',
    title: 'Kiwi',
    description: 'Sveji Kiwi',
    price: '7.59',
    category: 'Meyveler ve terevezler',
    type: 'Kiloqram',
    date: '03.08.2025',
  },
];

const PAGE_SIZE = 5;
const TOTAL_RESULTS = 9;

const SearchIcon = () => (
  <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EditIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const TrashIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(TOTAL_RESULTS / PAGE_SIZE);

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Məhsullar</h1>
        <button type="button" className={styles.addButton}>
          + Yeni Məhsul
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.colOrder}>Sıra</th>
              <th className={styles.colImage}>Şəkil</th>
              <th>
                <span className={styles.thWithIcon}>Ad <SearchIcon /></span>
              </th>
              <th>
                <span className={styles.thWithIcon}>Açıqlama <SearchIcon /></span>
              </th>
              <th>Qiymət</th>
              <th>
                <span className={styles.thWithIcon}>Kateqoriya <SearchIcon /></span>
              </th>
              <th>
                <span className={styles.thWithIcon}>Növ <SearchIcon /></span>
              </th>
              <th>Tarix</th>
              <th className={styles.colAction}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PRODUCTS.map((product) => (
              <tr key={product.id}>
                <td className={styles.colOrder}>{product.order}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.productImg}
                  />
                </td>
                <td className={styles.colTitle}>{product.title}</td>
                <td className={styles.colDesc}>{product.description}</td>
                <td className={styles.colPrice}>
                  {product.price} <span className={styles.currency}>₼</span>
                </td>
                <td>
                  <span className={styles.badge}>{product.category}</span>
                </td>
                <td>
                  <span className={styles.badge}>{product.type}</span>
                </td>
                <td className={styles.colDate}>{product.date}</td>
                <td className={styles.colAction}>
                  <div className={styles.actions}>
                    <button type="button" className={styles.editButton}>
                      <EditIcon /> Düzəlt
                    </button>
                    <button type="button" className={styles.deleteButton}>
                      <TrashIcon /> Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <span>
          1-{PAGE_SIZE} / {TOTAL_RESULTS} nəticə
        </span>
        <button
          type="button"
          className={styles.pageArrow}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          ‹
        </button>
        <div className={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`${styles.pageNumber} ${
                currentPage === page ? styles.pageNumberActive : ''
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.pageArrow}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;