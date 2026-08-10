import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { Button } from '../../shared/components/Button';
import { Table } from '../../shared/components/Table';
import { DeleteConfirmModal } from '../../shared/components/DeleteConfirmModal';
import { Loader } from '../../shared/components/Loader';
import { PageTitle } from '../../shared/components/PageTitle';

import { CampaignModal } from '../../features/campaigns/components/CampaignModal';
import { useCampaigns } from '../../features/campaigns/hooks/useCampaigns';
import { getCampaignColumns } from '../../features/campaigns/utils/campaignColumns';
import type { Campaign } from '../../features/campaigns/types/campaignType';

import styles from './campaign.module.css';

export const CampaignsPage = () => {
  const { campaigns, loading, fetchAll, deleteCampaign } = useCampaigns();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const openAddModal = () => {
    setModalMode('add');
    setEditingCampaign(undefined);
    setModalOpen(true);
  };

  const openEditModal = (record: Campaign) => {
    setModalMode('edit');
    setEditingCampaign(record);
    setModalOpen(true);
  };

  const columns = getCampaignColumns({
    onEdit: openEditModal,
    onDelete: setDeleteId,
  });

  return (
    <>
      <div className={styles.headerRow}>
        <PageTitle>Kampaniyalar</PageTitle>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles.addButton}
          onClick={openAddModal}
        >
          Yeni Kampaniya
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Table<Campaign>
          size="small"
          className={styles.table}
          columns={columns}
          dataSource={campaigns}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} / ${total} nəticə`,
          }}
        />
      )}

      <DeleteConfirmModal
        open={deleteId !== null}
        loading={loading}
        onConfirm={async () => {
          if (deleteId !== null) {
            await deleteCampaign(deleteId);
          }
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />

      <CampaignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        initialData={editingCampaign}
      />
    </>
  );
};
