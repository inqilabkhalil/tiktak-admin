import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
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

  return (
    <Sider width={250} theme="light">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ height: '100%', borderRight: 0 }}
      />
    </Sider>
  );
};
