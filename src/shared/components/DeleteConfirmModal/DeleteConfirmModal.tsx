import { Modal } from '../Modal';
import { Button } from '../Button';
import deleteIcon from '../../assets/deleteicon.png';

interface DeleteConfirmModalProps {
  open: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal = ({ open, loading, onConfirm, onCancel }: DeleteConfirmModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={loading ? undefined : onCancel}
      footer={null}
      centered
      width={420}
      closable={!loading}
      mask={{ closable: !loading }}
      styles={{
        body: {
          padding: 16,
        },
        header: {
          display: 'none',
        },
      }}
    >
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <img
          src={deleteIcon}
          alt="Silmə"
          style={{ width: 160, marginBottom: 24 }}
        />

        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
          Məlumatı silməyə əminsinizmi?
        </h2>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button
            style={{ flex: 1, backgroundColor: 'rgba(146, 216, 113, 1)', color: '#fff', border: 'none' }}
            loading={loading}
            onClick={onConfirm}
          >
            Təsdiqlə
          </Button>
          <Button
            style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #d9d9d9', color: '#8c8c8c' }}
            disabled={loading}
            onClick={onCancel}
          >
            İndi yox
          </Button>
        </div>
      </div>
    </Modal>
  );
};
