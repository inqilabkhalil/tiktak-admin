import { useEffect, useState, type Key } from "react";
import type { TableProps } from "antd";
import { Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PictureOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Table } from '@/shared/components/Table';
import { DeleteConfirmModal } from '@/shared/components/DeleteConfirmModal';
import { Loader } from '@/shared/components/Loader';
import { mockCategories } from '@/features/categories/utils/mockCategories';
import type { Category } from '@/features/categories/types/categories';
import type { FilterDropdownProps } from "antd/es/table/interface";
import styles from "./categories.module.css";

export const CategoriesPage = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  },[]);
  const getColumnSearchProps = (
    dataIndex: keyof Category,
    placeholder: string,
  ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div
        className={styles.filterDropdown}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          placeholder={`Axtar: ${placeholder}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
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
      <SearchOutlined className={filtered ? styles.filterIconActive : ""} />
    ),
    onFilter: (value: boolean | Key, record: Category) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(String(value).toLowerCase()),
  });

  const columns: TableProps<Category>["columns"] = [
    {
      title: "Sıra",
      key: "order",
      width: 70,
      render: (_, __, index) => (
        <span className={styles.orderCell}>{index + 1}</span>
      ),
    },
    {
      title: "Şəkil",
      dataIndex: "image",
      key: "image",
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
      title: "Ad",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title", "name"),
      render: (title: string) => (
        <span className={styles.titleCell}>{title}</span>
      ),
    },
    {
      title: "Açıqlama",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description", "description"),
      render: (description: string) => (
        <span className={styles.descriptionCell}>
          {description.length > 50
            ? `${description.slice(0, 50)}...`
            : description}
        </span>
      ),
    },
    {
      title: "Tarix",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (createdAt: string) => (
        <span className={styles.dateCell}>{createdAt}</span>
      ),
    },
    {
      title: "Əməliyyat",
      key: "actions",
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

      {loading ? (
        <Loader />
      ) : (
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
      )}

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={() => setDeleteId(null)}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
};

export default CategoriesPage;
