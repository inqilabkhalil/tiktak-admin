import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "@/shared/components/Button";
import { Table } from "@/shared/components/Table";
import { DeleteConfirmModal } from "@/shared/components/DeleteConfirmModal";
import { Loader } from "@/shared/components/Loader";
import { getCategoryColumns } from "@/features/categories/utils/categoryColumns";
import type { Category } from "@/features/categories/types/categories";
import styles from "./categories.module.css";
import tableStyles from "@/features/categories/styles/categoryTable.module.css";
import CategoryModal from "@/features/categories/components/CategoryModal";
import useColumnSearchProps from "@/features/categories/hooks/useColumnSearchProps";
import { PageTitle } from "@/shared/components/PageTitle";
import { useCategories } from "@/features/categories/hooks/useCategories";

export const CategoriesPage = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editData, setEditData] = useState<Category | null>(null);

  const { categories, loading, fetchAll, deleteCategory } = useCategories();
  const { getColumnSearchProps } = useColumnSearchProps<Category>();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const columns = getCategoryColumns({
    onEdit: setEditData,
    onDelete: setDeleteId,
    getColumnSearchProps,
  });

  const handleDeleteConfirim = async () => {
    if (deleteId !== null) {
      await deleteCategory(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className={styles.headerRow}>
        <PageTitle>Kateqoriyalar</PageTitle>

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
          dataSource={categories}
          rowKey="id"
          pagination={{
            pageSize: 5,
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
        onConfirm={handleDeleteConfirim}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
};

export default CategoriesPage;
