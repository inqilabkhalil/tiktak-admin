import { EyeOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Table } from '../../shared/components/Table';
import styles from './orders.module.css';

interface Order {
  id: number;
  avatar: string;
  fullName: string;
  phone: string;
  address: string;
  role: string;
}

const data: Order[] = [
  {
    id: 1,
    avatar: 'J',
    fullName: 'Johnnn',
    phone: '+994105554434',
    address: 'Qeyd olunmayıb',
    role: 'COMMERCE',
  },
];

const columns: TableProps<Order>['columns'] = [
  {
    title: 'Sıra',
    key: 'order',
    width: 70,
    render: (_, __, index) => index + 1,
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (text) => <div className={styles.avatar}>{text}</div>,
  },
  {
    title: 'Ad Soyad',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Telefon',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Ünvan',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Rol',
    dataIndex: 'role',
    key: 'role',
    render: (role) => <span className={styles.role}>{role}</span>,
  },
  {
    title: 'Əməliyyat',
    key: 'action',
    render: () => (
      <span className={styles.action}>
        <EyeOutlined /> Göstər
      </span>
    ),
  },
];

const Orders = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Sifarişlər</h1>

      <Table<Order>
        className={styles.table}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
    </div>
  );
};

export default Orders;
