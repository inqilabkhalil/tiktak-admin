import { useState } from 'react';
import type { TableProps } from 'antd';
import { Space } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PictureOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import Header from '../../shared/components/Header';
import { Sidebar } from '../../shared/components/Sidebar';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Table } from '../../shared/components/Table';
import { DeleteConfirmModal } from '../../shared/components/DeleteConfirmModal';

import { mockCategories } from '../../features/categories/utils/mockCategories';
import type { Category } from '../../features/categories/types/categories';

import '../../App.css';
import styles from './categories.module.css';

export const CategoriesPage = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const getColumnSearchProps = (dataIndex: keyof Category, placeholder: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
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
    onFilter: (value: any, record: Category) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
  });

  const columns: TableProps<Category>['columns'] = [
    {
      title: 'Sıra',
      key: 'order',
      width: 70,
      render: (_, __, index) => <span className={styles.orderCell}>{index + 1}</span>,
    },
    {
      title: 'Şəkil',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (image: string, record) =>
        image ? (
          <img src={image} alt={record.title} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <PictureOutlined />
          </div>
        ),
    },
    {
      title: 'Ad',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title', 'name'),
      render: (title: string) => <span className={styles.titleCell}>{title}</span>,
    },
    {
      title: 'Açıqlama',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description', 'description'),
      render: (description: string) => (
        <span className={styles.descriptionCell}>
          {description.length > 50 ? `${description.slice(0, 50)}...` : description}
        </span>
      ),
    },
    {
      title: 'Tarix',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (createdAt: string) => <span className={styles.dateCell}>{createdAt}</span>,
    },
    {
      title: 'Əməliyyat',
      key: 'actions',
      width: 170,
      render: (_, record) => (
        <div className={styles.actionsCell}>
          <Button type="link" className={styles.editAction} icon={<EditOutlined />}>
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
                <h1 className={styles.title}>Kateqoriyalar</h1>

                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className={styles.addButton}
                >
                  Yeni Kateqoriya
                </Button>
              </div>

              <Table<Category>
                size="small"
                className={styles.table}
                columns={columns}
                dataSource={mockCategories}
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

export default CategoriesPage;