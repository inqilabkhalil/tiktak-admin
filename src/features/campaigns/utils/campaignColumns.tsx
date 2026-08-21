import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons';

import { Button } from '@/shared/components/Button';
import { getColumnSearchProps } from '@/shared/hooks/columnSearchProps';

import type { Campaign } from '../types/campaignType';
import styles from '../../../pages/campaigns/campaign.module.css';

interface GetCampaignColumnsParams {
  onEdit: (record: Campaign) => void;
  onDelete: (id: number) => void;
}

export function getCampaignColumns({
  onEdit,
  onDelete,
}: GetCampaignColumnsParams): TableProps<Campaign>['columns'] {
  return [
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
      ...getColumnSearchProps<Campaign>('title', 'başlıq'),
      render: (title: string) => (
        <span className={styles.titleCell}>{title}</span>
      ),
    },
    {
      title: 'Açıqlama',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps<Campaign>('description', 'açıqlama'),
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
            onClick={() => onEdit(record)}
          >
          </Button>

          <Button
            type="link"
            className={styles.deleteAction}
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          >
          </Button>
        </div>
      ),
    },
  ];
}
