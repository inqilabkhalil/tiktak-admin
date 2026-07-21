import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "@/shared/components/Button";
import { Table } from "@/shared/components/Table";
import { DeleteConfirmModal } from "@/shared/components/DeleteConfirmModal";
import { Loader } from "@/shared/components/Loader";
import { mockCategories } from "@/features/categories/utils/mockCategories";
import { getCategoryColumns } from "@/features/categories/utils/categoryColumns";
import type { Category } from "@/features/categories/types/categories";
import styles from "./categories.module.css";
import tableStyles from "@/features/categories/styles/categoryTable.module.css";
import CategoryModal from "@/features/categories/components/CategoryModal";
import useColumnSearchProps from "@/features/categories/hooks/useColumnSearchProps";

export const CategoriesPage = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editData, setEditData] = useState<Category | null>(null);

  const { getColumnSearchProps } = useColumnSearchProps<Category>();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const columns = getCategoryColumns({
    onEdit: setEditData,
    onDelete: setDeleteId,
    getColumnSearchProps,
  });

  return (
    <>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Kateqoriyalar</h1>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles.addButton}
          onClick={() => setAddModalOpen(true)}
        >
          Yeni Kateqoriya
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Table<Category>
          size="small"
          className={tableStyles.table}
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

      <CategoryModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        mode="add"
      />

      <CategoryModal
        open={editData !== null}
        onClose={() => setEditData(null)}
        mode="edit"
        initialData={editData || undefined}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={() => setDeleteId(null)}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
};

export default CategoriesPage;
