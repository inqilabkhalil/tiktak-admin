import type { TableProps } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Button } from "@/shared/components/Button";
import type { Category, GetCategoryColumnsProps } from "../types/categories";
import styles from "../styles/categoryTable.module.css";

export const getCategoryColumns = ({
  onEdit,
  onDelete,
  getColumnSearchProps,
}: GetCategoryColumnsProps): TableProps<Category>["columns"] => [
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
          onClick={() => onEdit(record)}
        >
          Düzəlt
        </Button>
        <Button
          type="link"
          className={styles.deleteAction}
          icon={<DeleteOutlined />}
          onClick={() => onDelete(record.id)}
        >
          Sil
        </Button>
      </div>
    ),
  },
];
