import { useEffect, useState } from 'react';
import {
  EyeOutlined,
  PhoneOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Spin } from 'antd';
import type { TableProps } from 'antd';

import { Table } from '../../shared/components/Table';
import { Modal } from '../../shared/components/Modal';

import styles from './users.module.css';

interface User {
  id: number;
  avatar: string;
  fullName: string;
  phone: string;
  address: string;
  role: string;
}

const data: User[] = [
  {
    id: 1,
    avatar: 'J',
    fullName: 'Johnnn',
    phone: '+994105554434',
    address: 'Qeyd olunmayıb',
    role: 'COMMERCE',
  },
];

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const columns: TableProps<User>['columns'] = [
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
      render: (_, record) => (
        <span
          className={styles.action}
          onClick={() => {
            setSelectedUser(record);
            setIsModalOpen(true);
          }}
        >
          <EyeOutlined className={styles.eyeIcon} />
          <span className={styles.actionText}>Göstər</span>
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className={styles.page}>
        <h1 className={styles.title}>İstifadəçilər</h1>

        <Table<User>
          className={styles.table}
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={520}
        closable={false}
      >
        {selectedUser && (
          <div className={styles.userModal}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>İstifadəçi Məlumatları</div>

              <button
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalAvatar}>{selectedUser.avatar}</div>

              <h2 className={styles.modalName}>{selectedUser.fullName}</h2>

              <div className={styles.modalRole}>
                <IdcardOutlined className={styles.roleIcon} />
                <span>{selectedUser.role}</span>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoRow}>
                  <div className={styles.infoIcon}>
                    <PhoneOutlined />
                  </div>

                  <div>
                    <div className={styles.label}>Telefon</div>
                    <div className={styles.value}>{selectedUser.phone}</div>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoIcon}>
                    <EnvironmentOutlined />
                  </div>

                  <div>
                    <div className={styles.label}>Ünvan</div>
                    <div className={styles.value}>{selectedUser.address}</div>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoIcon}>
                    <CalendarOutlined />
                  </div>

                  <div>
                    <div className={styles.label}>Yaradılma tarixi</div>
                    <div className={styles.value}>17.07.2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Users;
