import { useState } from 'react';
import type { TableProps } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PictureOutlined,
} from '@ant-design/icons';

import Header from '../../shared/components/Header';
import { Sidebar } from '../../shared/components/Sidebar';
import { Button } from '../../shared/components/Button';
import { Table } from '../../shared/components/Table';
import { DeleteConfirmModal } from '../../shared/components/DeleteConfirmModal';

import { mockCampaigns } from '../../features/campaigns/utils/mockCampaigns';
import type { Campaign } from '../../features/campaigns/types/campaign';

import '../../App.css';
import styles from './campaign.module.css';

export const CampaignsPage = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const columns: TableProps<Campaign>['columns'] = [
    {
      title: 'Sıra',
      key: 'order',
      width: 70,
      render: (_, __, index) => (
        <span className={styles.orderCell}>{index + 1}</span>
      ),
    },
    {
      title: 'Şəkil',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (image: string, record) =>
        image ? (
          <img
            src={image}
            alt={record.title}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <PictureOutlined style={{ fontSize: 20 }} />
          </div>
        ),
    },
    {
      title: 'Başlıq',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => (
        <span className={styles.titleCell}>{title}</span>
      ),
    },
    {
      title: 'Açıqlama',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <span className={styles.descriptionCell}>
          {description.length > 38
            ? `${description.slice(0, 38)}...`
            : description}
        </span>
      ),
    },
    {
      title: 'Tarix',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (createdAt: string) => (
        <span className={styles.dateCell}>{createdAt}</span>
      ),
    },
    {
      title: 'Əməliyyat',
      key: 'actions',
      width: 170,
      render: (_, record) => (
        <div className={styles.actionsCell}>
          <Button
            type="link"
            className={styles.editAction}
            icon={<EditOutlined />}
          >
            Düzəlt
          </Button>

          <Button
            type="link"
            className={styles.deleteAction}
            icon={<DeleteOutlined />}
            onClick={() => setDeleteId(record.id)}
          >
            Sil
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />

      <div className="app-container">
        <div className={styles.layout}>
          <Sidebar />

          <main>
            <div className={styles.page}>
              <div className={styles.headerRow}>
                <h1 className={styles.title}>Kampaniyalar</h1>

                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className={styles.addButton}
                  onClick={() => console.log('new campaign')}
                >
                  Yeni Kampaniya
                </Button>
              </div>

              <Table<Campaign>
                size="small"
                className={styles.table}
                columns={columns}
                dataSource={mockCampaigns}
                rowKey="id"
                pagination={{
                  showSizeChanger: false,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} / ${total} nəticə`,
                }}
              />

              <DeleteConfirmModal
                open={deleteId !== null}
                onConfirm={() => setDeleteId(null)}
                onCancel={() => setDeleteId(null)}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};