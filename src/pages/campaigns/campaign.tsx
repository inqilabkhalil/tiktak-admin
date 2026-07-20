import { useState } from 'react';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PictureOutlined,
} from '@ant-design/icons';

import { Button } from '../../shared/components/Button';
import { Table } from '../../shared/components/Table';
import { DeleteConfirmModal } from '../../shared/components/DeleteConfirmModal';
import { EditModal } from '../../shared/components/EditModal';
import type { ModalMode } from '../../shared/types';

import { mockCampaigns } from '../../features/campaigns/utils/mockCampaigns';
import type { Campaign } from '../../features/campaigns/types/campaign';

import styles from './campaign.module.css';

export const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const openAddModal = () => {
    setModalMode('add');
    setEditingCampaign(null);
    setModalOpen(true);
  };

  const openEditModal = (record: Campaign) => {
    setModalMode('edit');
    setEditingCampaign(record);
    setModalOpen(true);
  };

  const handleModalSubmit = (formData: FormData, id?: string) => {
    const title = String(formData.get('title') || '');
    const description = String(formData.get('description') || '');
    const imageFile = formData.get('image');
    const imageUrl =
      imageFile instanceof File ? URL.createObjectURL(imageFile) : undefined;

    if (id) {
      setCampaigns((prev) =>
        prev.map((campaign) =>
          String(campaign.id) === id
            ? {
                ...campaign,
                title,
                description,
                image: imageUrl ?? campaign.image,
              }
            : campaign
        )
      );
    } else {
      setCampaigns((prev) => [
        ...prev,
        {
          id: Math.max(0, ...prev.map((campaign) => campaign.id)) + 1,
          image: imageUrl ?? '',
          title,
          description,
          createdAt: dayjs().format('DD.MM.YYYY'),
        },
      ]);
    }

    setModalOpen(false);
  };

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
            onClick={() => openEditModal(record)}
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
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Kampaniyalar</h1>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles.addButton}
          onClick={openAddModal}
        >
          Yeni Kampaniya
        </Button>
      </div>

      <Table<Campaign>
        size="small"
        className={styles.table}
        columns={columns}
        dataSource={campaigns}
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

      <EditModal
        open={modalOpen}
        mode={modalMode}
        type="campaign"
        initialData={
          editingCampaign
            ? {
                id: String(editingCampaign.id),
                title: editingCampaign.title,
                description: editingCampaign.description,
                imageUrl: editingCampaign.image || undefined,
              }
            : undefined
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};