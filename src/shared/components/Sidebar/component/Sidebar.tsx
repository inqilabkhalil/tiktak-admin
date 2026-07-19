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
import { COLORS } from '../../../constants/colors';

const { Sider } = Layout;

const menuItems = [
  { key: '/orders', label: 'Sifarişlər' },
  { key: '/campaigns', label: 'Kampaniyalar' },
  { key: '/categories', label: 'Kateqoriyalar' },
  { key: '/products', label: 'Məhsullar' },
  { key: '/users', label: 'İstifadəçilər' },
  { key: '/logout', label: 'Çıxış' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      width={250} /* must match --sidebar-width in index.css */
      theme="light"
      style={{ background: '#fff', borderTop: '1px solid #f0f0f0', height: '100%' }}
    >
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedColor: COLORS.mainGreen,
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
          onClick={({ key }) => navigate(key)}
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