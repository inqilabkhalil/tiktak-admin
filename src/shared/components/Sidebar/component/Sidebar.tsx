
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
  { key: '/orders', label: 'Sifarişlər', icon: <ShoppingCartOutlined /> },
  { key: '/campaigns', label: 'Kampaniyalar', icon: <NotificationOutlined /> },
  { key: '/categories', label: 'Kateqoriyalar', icon: <AppstoreOutlined /> },
  { key: '/products', label: 'Məhsullar', icon: <ShopOutlined /> },
  { key: '/users', label: 'İstifadəçilər', icon: <UserOutlined /> },
  { key: '/logout', label: 'Çıxış', icon: <LogoutOutlined /> },
];

export const Sidebar = () => {

  return (
    <Sider
      width={250}
      theme="light"
      style={{ background: '#fff', borderTop: '1px solid #f0f0f0' }}
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
          items={menuItems}
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