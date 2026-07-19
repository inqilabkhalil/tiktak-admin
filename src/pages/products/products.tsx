import { useState } from 'react';
import type { Key } from 'react';
import type { TableProps } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { Space, message } from 'antd';
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

import { deleteProduct, fetchProducts } from '../../features/products/services/productsService';
import type { Product } from '../../features/products/types/products';

import styles from './products.module.css';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      message.error('Məhsullar yüklənərkən xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    loadProducts();
    return null;
  });

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteProduct(deleteId);
      message.success('Məhsul silindi');
      setDeleteId(null);
      loadProducts();
    } catch {
      message.error('Silinmə zamanı xəta baş verdi');
    }
  };

  const getColumnSearchProps = (dataIndex: keyof Product, placeholder: string) => ({
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
    onFilter: (value: Key | boolean, record: Product) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(String(value).toLowerCase()),
  });

  const columns: TableProps<Product>['columns'] = [
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
      title: 'Qiymət',
      dataIndex: 'price',
      key: 'price',
      width: 110,
      sorter: (a, b) => parseFloat(a.price) - parseFloat(b.price),
      render: (price: string) => (
        <span className={styles.priceCell}>
          {price} <span className={styles.currency}>₼</span>
        </span>
      ),
    },
    {
      title: 'Kateqoriya',
      dataIndex: 'category',
      key: 'category',
      ...getColumnSearchProps('category', 'category'),
      render: (category: string) => <span className={styles.badge}>{category}</span>,
    },
    {
      title: 'Növ',
      dataIndex: 'type',
      key: 'type',
      ...getColumnSearchProps('type', 'type'),
      render: (type: string) => <span className={styles.badge}>{type}</span>,
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
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Məhsullar</h1>

        <Button type="primary" icon={<PlusOutlined />} className={styles.addButton}>
          Yeni Məhsul
        </Button>
      </div>

      <Table<Product>
        size="small"
        className={styles.table}
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        pagination={{
          showSizeChanger: false,
          showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} nəticə`,
        }}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
};

export default ProductsPage;