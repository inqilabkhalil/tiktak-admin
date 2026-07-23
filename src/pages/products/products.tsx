import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from '@/shared/components/Button';
import { Table } from '@/shared/components/Table';
import { DeleteConfirmModal } from '@/shared/components/DeleteConfirmModal';
import { Loader } from '@/shared/components/Loader';
import { PageTitle } from '@/shared/components/PageTitle';
import { getProductColumns } from '@/features/products/utils/productColumns';
import type { Product } from '@/features/products/types/products';
import ProductsModal from '@/features/products/components/ProductsModal';
import useColumnSearchProps from '@/features/products/hooks/useColumnSearchProps';
import { useProductStore } from '@/features/products/store/useProductStore';
import styles from './products.module.css';
import tableStyles from '@/features/products/styles/productsTable.module.css';

export const ProductsPage = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);

  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const fetchAll = useProductStore((state) => state.fetchAll);
  const remove = useProductStore((state) => state.remove);

  const { getColumnSearchProps } = useColumnSearchProps<Product>();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const columns = getProductColumns({
    onEdit: setEditData,
    onDelete: setDeleteId,
    getColumnSearchProps,
  });

  const handleDeleteConfirim = async () => {
    if (deleteId !== null) {
      await remove(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className={styles.headerRow}>
        <PageTitle>Məhsullar</PageTitle>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles.addButton}
          onClick={() => setAddModalOpen(true)}
        >
          Yeni Məhsul
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Table<Product>
          size="small"
          className={tableStyles.table}
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} nəticə`,
          }}
        />
      )}

      <ProductsModal open={addModalOpen} onClose={() => setAddModalOpen(false)} mode="add" />

      <ProductsModal
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

export default ProductsPage;
