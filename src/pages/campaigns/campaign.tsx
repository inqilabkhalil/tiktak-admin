import { useEffect, useState } from 'react';
import type { Key } from 'react';
import type { TableProps } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { Space } from 'antd';
import dayjs from 'dayjs';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PictureOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Table } from '../../shared/components/Table';
import { DeleteConfirmModal } from '../../shared/components/DeleteConfirmModal';
import { Loader } from '../../shared/components/Loader';

import { CampaignModal } from '../../features/campaigns/components/CampaignModal';
import { useCampaignStore } from '../../features/campaigns/store/campaignStore';
import type { Campaign } from '../../features/campaigns/types/campaignType';

import styles from './campaign.module.css';

export const CampaignsPage = () => {
  const { campaigns, loading, error, fetchAll, remove } = useCampaignStore();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const openAddModal = () => {
    setModalMode('add');
    setEditingCampaign(undefined);
    setModalOpen(true);
  };

  const openEditModal = (record: Campaign) => {
    setModalMode('edit');
    setEditingCampaign(record);
    setModalOpen(true);
  };

  const getColumnSearchProps = (dataIndex: keyof Campaign, placeholder: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div className={styles.filterDropdown} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={`Axtar: ${placeholder}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          className={styles.filterInput}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            className={styles.filterButton}
          >
            Axtar
          </Button>
          <Button
            onClick={() => {
              clearFilters?.();
              confirm();
            }}
            size="small"
            className={styles.filterButton}
          >
            Sıfırla
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined className={filtered ? styles.filterIconActive : ''} />
    ),
    onFilter: (value: Key | boolean, record: Campaign) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(String(value).toLowerCase()),
  });

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
      dataIndex: 'img_url',
      key: 'img_url',
      width: 100,
      render: (img_url: string, record) =>
        img_url ? (
          <img
            src={img_url}
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
      ...getColumnSearchProps('title', 'başlıq'),
      render: (title: string) => (
        <span className={styles.titleCell}>{title}</span>
      ),
    },
    {
      title: 'Açıqlama',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description', 'açıqlama'),
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
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      render: (created_at: string) => (
        <span className={styles.dateCell}>
          {dayjs(created_at).format('DD.MM.YYYY')}
        </span>
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

      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: 'rgba(255, 77, 79, 1)' }}>{error}</p>
      ) : (
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
      )}

      <DeleteConfirmModal
        open={deleteId !== null}
        loading={loading}
        onConfirm={async () => {
          if (deleteId !== null) {
            await remove(deleteId);
          }
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />

      <CampaignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        initialData={editingCampaign}
      />
    </>
  );
};
