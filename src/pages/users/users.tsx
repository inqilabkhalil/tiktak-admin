import { useEffect, useState } from 'react';
import {
  EyeOutlined,
  PhoneOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';

import { Table } from '@/shared/components/Table';
import { Modal } from '@/shared/components/Modal';
import { Loader } from '@/shared/components/Loader';
import { PageTitle } from '@/shared/components/PageTitle';

import { useUserStore } from '@/features/users/store/useUserStore';
import type { User } from '@/features/users/types/users';

import styles from './users.module.css';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users = useUserStore((state) => state.users);
  console.log(users);
  const loading = useUserStore((state) => state.loading);
  const fetchAll = useUserStore((state) => state.fetchAll);

  useEffect(() => {
    console.log('fetchAll başladı');
    fetchAll();
  }, [fetchAll]);
  const columns: TableProps<User>['columns'] = [
    {
      title: 'Sıra',
      key: 'order',
      width: 70,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Avatar',
      dataIndex: 'img_url',
      key: 'img_url',
      render: (_, record) => (
        <div className={styles.avatar}>
          {record.img_url ? (
            <img src={record.img_url} alt={record.full_name} />
          ) : (
            record.full_name.charAt(0)
          )}
        </div>
      ),
    },
    {
      title: 'Ad Soyad',
      dataIndex: 'full_name',
      key: 'full_name',
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
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
      render: (address) => address || 'Qeyd olunmayıb',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
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
    return <Loader />;
  }

  return (
    <>
      <div className={styles.page}>
        <PageTitle>İstifadəçilər</PageTitle>

        <Table<User>
          className={styles.table}
          columns={columns}
          dataSource={users}
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
              <div className={styles.modalAvatar}>
                {selectedUser.img_url ? (
                  <img
                    src={selectedUser.img_url}
                    alt={selectedUser.full_name}
                  />
                ) : (
                  selectedUser.full_name.charAt(0)
                )}
              </div>

              <h2 className={styles.modalName}>{selectedUser.full_name}</h2>

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
                    <div className={styles.value}>
                      {selectedUser.address || 'Qeyd olunmayıb'}
                    </div>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoIcon}>
                    <CalendarOutlined />
                  </div>

                  <div>
                    <div className={styles.label}>Yaradılma tarixi</div>
                    <div className={styles.value}>
                      {new Date(selectedUser.created_at).toLocaleDateString(
                        'az-AZ',
                      )}
                    </div>
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
