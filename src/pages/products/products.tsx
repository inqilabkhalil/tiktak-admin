import { useEffect, useMemo, useState } from 'react';
import { message } from 'antd';
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
import { useSearchStore } from '@/shared/store/useSearchStore';

export const ProductsPage = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);

  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const fetchAll = useProductStore((state) => state.fetchAll);
  const remove = useProductStore((state) => state.remove);

  const { getColumnSearchProps } = useColumnSearchProps<Product>();

  const searchTerm = useSearchStore((s) => s.searchTerm);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const columns = getProductColumns({
    onEdit: setEditData,
    onDelete: setDeleteId,
    getColumnSearchProps,
  });

  const filteredProducts = useMemo(() => {
  if (!searchTerm.trim()) return products;
  const lower = searchTerm.toLowerCase();
  return products.filter((p) =>  
    p.title?.toLowerCase().includes(lower) ||
    p.description?.toLowerCase().includes(lower) ||
    p.price?.toLowerCase().includes(lower) ||
    p.category?.name?.toLowerCase().includes(lower)
  );
}, [products, searchTerm]);

  const handleDeleteConfirim = async () => {
    if (deleteId !== null) {
      const success = await remove(deleteId);
      if (success) {
        message.success('Məhsul uğurla silindi');
      } else {
        message.error('Məhsulu silmək mümkün olmadı');
      }
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
          dataSource={filteredProducts}
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
        loading={loading}
        onConfirm={handleDeleteConfirim}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
};

export default ProductsPage;
