import { useSearchParams } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';

const menuItems = [
  { key: '/orders', label: 'Sifarişlər' },
  { key: '/campaigns', label: 'Kampaniyalar' },
  { key: '/categories', label: 'Kateqoriyalar' },
  { key: '/products', label: 'Məhsullar' },
  { key: '/users', label: 'İstifadəçilər' },
  { key: '/logout', label: 'Çıxış' },
];

export const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get('page') ?? '/campaigns';

  return (
    <nav className={styles.nav}>
      {menuItems.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`${styles.navItem} ${
            activeKey === item.key ? styles.navItemActive : ''
          }`}
          onClick={() => setSearchParams({ page: item.key })}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};