import type { TableProps } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Button } from "@/shared/components/Button";
import { PRODUCT_UNIT_OPTIONS } from "../types/products";
import type { Product, GetProductColumnsProps, ProductUnit } from "../types/products";
import styles from "../styles/productsTable.module.css";

const getUnitLabel = (type: ProductUnit) =>
  PRODUCT_UNIT_OPTIONS.find((option) => option.value === type)?.label ?? type;

export const getProductColumns = ({
  onEdit,
  onDelete,
  getColumnSearchProps,
}: GetProductColumnsProps): TableProps<Product>["columns"] => [
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
    dataIndex: "img_url",
    key: "img_url",
    width: 100,
    render: (imgUrl: string, record) =>
      imgUrl ? (
        <img src={imgUrl} alt={record.title} className={styles.image} />
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
    width: 130,
    ...getColumnSearchProps("title", "ad"),
    render: (title: string) => (
      <span className={styles.titleCell}>{title}</span>
    ),
  },
  {
    title: "Açıqlama",
    dataIndex: "description",
    key: "description",
    width: 260,
    ...getColumnSearchProps("description", "açıqlama"),
    render: (description: string) => (
      <span className={styles.descriptionCell}>{description}</span>
    ),
  },
  {
    title: "Qiymət",
    dataIndex: "price",
    key: "price",
    width: 110,
    sorter: (a, b) => parseFloat(a.price) - parseFloat(b.price),
    render: (price: string) => (
      <span className={styles.priceCell}>
        {price} <span className={styles.currency}>₼</span>
      </span>
    ),
  },
  {
    title: "Kateqoriya",
    dataIndex: "category",
    key: "category",
    ...getColumnSearchProps(
      "category",
      "kateqoriya",
      (record) => record.category?.name ?? "",
    ),
    render: (category: Product["category"]) => (
      <span className={styles.categoryCell}>{category?.name}</span>
    ),
  },
  {
    title: "Növ",
    dataIndex: "type",
    key: "type",
    ...getColumnSearchProps("type", "növ", (record) => getUnitLabel(record.type)),
    render: (type: ProductUnit) => <span className={styles.badge}>{getUnitLabel(type)}</span>,
  },
  {
    title: "Tarix",
    dataIndex: "created_at",
    key: "created_at",
    width: 120,
    render: (created_at: string) => (
      <span className={styles.dateCell}>
        {dayjs(created_at).format("DD.MM.YYYY")}
      </span>
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
