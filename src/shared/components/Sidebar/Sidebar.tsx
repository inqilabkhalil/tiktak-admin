import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, ConfigProvider, Menu } from 'antd';
import {
  ShoppingCartOutlined,
  NotificationOutlined,
  AppstoreOutlined,
  ShopOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  { key: '/orders', label: 'Sifarişlər', icon: <ShoppingCartOutlined /> },
  { key: '/campaigns', label: 'Kampaniyalar', icon: <NotificationOutlined /> },
  { key: '/categories', label: 'Kateqoriyalar', icon: <AppstoreOutlined /> },
  { key: '/products', label: 'Məhsullar', icon: <ShopOutlined /> },
  { key: '/users', label: 'İstifadəçilər', icon: <UserOutlined /> },
  { key: '/logout', label: 'Çıxış', icon: <LogoutOutlined /> },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === '/logout') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token'); // varsa siləcək, yoxdursa problem yaratmır

      navigate('/auth', { replace: true });
      return;
    }

    navigate(key);
  };

  return (
    <Sider
      width={250}
      theme="light"
      style={{
        background: '#fff',
        borderTop: '1px solid #f0f0f0',
        height: '100%',
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedColor: 'var(--color-main-green)',
              itemSelectedBg: 'transparent',
              itemActiveBg: 'transparent',
              itemHoverBg: 'transparent',
              itemHeight: 44,
              itemMarginBlock: 20,
              itemBorderRadius: 10,
              colorText: '#000000',
              fontSize: 14,
              iconSize: 14,
            },
          },
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            height: '100%',
            borderRight: 0,
            fontWeight: 500,
            background: '#fff',
          }}
        />
      </ConfigProvider>
    </Sider>
  );
};
