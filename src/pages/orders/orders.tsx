import { EyeOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
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
    sorter: (a, b) => a.fullName.localeCompare(b.fullName),
  },
  {
    title: 'Telefon',
    dataIndex: 'phone',
    key: 'phone',
    sorter: (a, b) => a.phone.localeCompare(b.phone),
    render: (phone) => (
      <span className={styles.phone}>
        <PhoneOutlined className={styles.phoneIcon} />
        {phone}
      </span>
    ),
  },
  {
    title: 'Ünvan',
    dataIndex: 'address',
    key: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
  {
    title: 'Rol',
    dataIndex: 'role',
    key: 'role',
    sorter: (a, b) => a.role.localeCompare(b.role),
    render: (role) => (
      <span className={styles.role}>
        <IdcardOutlined />
        {role}
      </span>
    ),
  },
  {
    title: 'Əməliyyat',
    key: 'action',
    render: () => (
      <span className={styles.action}>
        <EyeOutlined className={styles.eyeIcon} />
        <span className={styles.actionText}>Göstər</span>
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
