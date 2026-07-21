import { useState } from 'react';
import { useFormik } from 'formik';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Textarea } from '@/shared/components/Textarea';
import { Button } from '@/shared/components/Button';
import { uploadFile } from '@/shared/services/uploadService';

import { useCampaignStore } from '../../store/campaignStore';
import { campaignValidationSchema } from '../../utils/campaignValidation';
import type { CampaignFormValues, CampaignModalProps } from '../../types/campaignType';

import styles from './CampaignModal.module.css';

export const CampaignModal = ({ open, onClose, mode, initialData }: CampaignModalProps) => {
  const { add, update, loading } = useCampaignStore();
  const [uploading, setUploading] = useState(false);

  const formik = useFormik<CampaignFormValues>({
    initialValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      img_url: initialData?.img_url || '',
    },
    validationSchema: campaignValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (mode === 'add') {
        await add(values);
      } else if (initialData) {
        await update(initialData.id, values);
      }
      formik.resetForm();
      onClose();
    },
  });

  return (
    <Modal
      title={mode === 'add' ? 'Yeni Kampaniya' : 'Kampaniyanı Düzəlt'}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Şəkil ünvanı</label>
          <Upload
            showUploadList={false}
            maxCount={1}
            customRequest={async ({ file, onSuccess, onError }) => {
              try {
                setUploading(true);
                const { url } = await uploadFile(file as File);
                formik.setFieldValue('img_url', url);
                onSuccess?.(url);
              } catch (err) {
                message.error('Şəkil yüklənərkən xəta baş verdi');
                onError?.(err as Error);
              } finally {
                setUploading(false);
              }
            }}
          >
            <div className={styles.uploadTrigger}>
              <span className={styles.uploadText}>
                {uploading
                  ? 'Yüklənir...'
                  : formik.values.img_url
                    ? formik.values.img_url.length > 20
                      ? `${formik.values.img_url.slice(0, 20)}...`
                      : formik.values.img_url
                    : 'Şəkil seçin '}
              </span>
              <UploadOutlined />
            </div>
          </Upload>
          {formik.values.img_url && (
            <img src={formik.values.img_url} alt="" className={styles.preview} />
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Başlıq</label>
          <Input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched.title && formik.errors.title ? 'error' : ''}
          />
          {formik.touched.title && formik.errors.title && (
            <span className={styles.error}>{formik.errors.title}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Açıqlama</label>
          <Textarea
            name="description"
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched.description && formik.errors.description ? 'error' : ''}
          />
          {formik.touched.description && formik.errors.description && (
            <span className={styles.error}>{formik.errors.description}</span>
          )}
        </div>

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          disabled={uploading}
          className={styles.submitButton}
        >
          {mode === 'add' ? 'Məlumatları yarat' : 'Məlumatları yenilə'}
        </Button>
      </form>
    </Modal>
  );
};

export default CampaignModal;
