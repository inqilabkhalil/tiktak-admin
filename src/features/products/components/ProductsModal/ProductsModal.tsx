import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Select, InputNumber, Upload, message } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

import { useProductStore } from '../../store/useProductStore';
import { useCategoryStore } from '@/features/categories/store/categoryStore';
import { uploadFile } from '@/shared/services/uploadService';
import { productValidationSchema } from '../../utils/productValidation';
import { PRODUCT_UNIT_OPTIONS } from '../../types/products';
import type {
  ProductFormValues,
  ProductModalProps,
  ProductUnit,
} from '../../types/products';

import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Textarea } from '@/shared/components/Textarea';
import { Button } from '@/shared/components/Button';

import styles from './ProductsModal.module.css';

const ProductsModal = ({
  open,
  onClose,
  mode,
  initialData,
}: ProductModalProps) => {
  const { add, update, loading } = useProductStore();
  const categories = useCategoryStore((state) => state.categories) ?? [];
  const fetchCategories = useCategoryStore((state) => state.fetchAll);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) fetchCategories();
  }, [open, fetchCategories]);

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      price: initialData ? Number(initialData.price) : 0,
      type: initialData?.type || ('' as ProductUnit),
      category_id: initialData?.category?.id || 0,
      img_url: initialData?.img_url || '',
    },
    validationSchema: productValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        title: values.title,
        description: values.description,
        price: String(values.price),
        type: values.type,
        category_id: values.category_id,
        img_url: values.img_url,
      };

      const success =
        mode === 'add'
          ? await add(payload)
          : initialData
            ? await update(initialData.id, payload)
            : false;

      if (success) {
        message.success(
          mode === 'add' ? 'Məhsul uğurla yaradıldı' : 'Məhsul uğurla yeniləndi',
        );
        formik.resetForm();
        onClose();
      } else {
        message.error(
          mode === 'add'
            ? 'Məhsulu yaratmaq mümkün olmadı'
            : 'Məhsulu yeniləmək mümkün olmadı',
        );
      }
    },
  });

  const getFileName = (url: string) => {
    if (!url) return '';
    return url.split('/').pop() || url;
  };

  return (
    <Modal
      title={mode === 'add' ? 'Yeni Məhsul' : 'Məhsulu Düzəlt'}
      open={open}
      onCancel={onClose}
      footer={null}
      width={760}
    >
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        {/* Məhsul Adı */}
        <div className={styles.field}>
          <label className={styles.label}>Məhsul Adı</label>
          <Input
            name="title"
            placeholder="Məhsulun adını daxil edin"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched.title && formik.errors.title ? 'error' : ''}
          />
          {formik.touched.title && formik.errors.title && (
            <span className={styles.error}>{formik.errors.title}</span>
          )}
        </div>

        {/* Açıqlama */}
        <div className={styles.field}>
          <label className={styles.label}>Açıqlama</label>
          <Textarea
            name="description"
            rows={4}
            placeholder="Məhsulun açıqlamasını yazın"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={
              formik.touched.description && formik.errors.description
                ? 'error'
                : ''
            }
          />
          {formik.touched.description && formik.errors.description && (
            <span className={styles.error}>{formik.errors.description}</span>
          )}
        </div>

        {/* Qiymət & Ölçü Vahidi */}
        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>Qiymət</label>
            <InputNumber
              className={styles.numberInput}
              placeholder="Qiymət daxil edin"
              min={0}
              value={formik.values.price || undefined}
              onChange={(value) => formik.setFieldValue('price', value ?? 0)}
              onBlur={() => formik.setFieldTouched('price', true)}
              style={{ width: '100%' }}
            />
            {formik.touched.price && formik.errors.price && (
              <span className={styles.error}>{formik.errors.price}</span>
            )}
          </div>

          <div className={styles.col}>
            <label className={styles.label}>Ölçü Vahidi</label>
            <Select
              className={styles.select}
              placeholder="Vahid"
              options={PRODUCT_UNIT_OPTIONS}
              value={formik.values.type || undefined}
              onChange={(value: ProductUnit) =>
                formik.setFieldValue('type', value)
              }
              onBlur={() => formik.setFieldTouched('type', true)}
              style={{ width: '100%' }}
            />
            {formik.touched.type && formik.errors.type && (
              <span className={styles.error}>{formik.errors.type}</span>
            )}
          </div>
        </div>

        {/* Kateqoriya & Şəkil */}
        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>Kateqoriya</label>
            <Select
              className={styles.select}
              placeholder="Kateqoriya seçin"
              loading={categories.length === 0}
              options={categories.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
              value={formik.values.category_id || undefined}
              onChange={(value) => formik.setFieldValue('category_id', value)}
              onBlur={() => formik.setFieldTouched('category_id', true)}
              style={{ width: '100%' }}
            />
            {formik.touched.category_id && formik.errors.category_id && (
              <span className={styles.error}>{formik.errors.category_id}</span>
            )}
          </div>

          <div className={styles.col}>
            <label className={styles.label}>Məhsul Şəkli</label>
            <Upload
              showUploadList={false}
              maxCount={1}
              accept="image/*"
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
              <Input
                readOnly
                value={getFileName(formik.values.img_url)}
                placeholder="Şəkil seçin"
                style={{ cursor: 'pointer' }}
                suffix={uploading ? <LoadingOutlined /> : <UploadOutlined />}
              />
            </Upload>
          </div>
        </div>

        {formik.values.img_url && (
          <img
            src={formik.values.img_url}
            alt="preview"
            className={styles.preview}
          />
        )}

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          disabled={uploading}
          className={styles.submitButton}
        >
          {mode === 'add' ? 'Məhsulu Yarat' : 'Məlumatları yenilə'}
        </Button>
      </form>
    </Modal>
  );
};

export default ProductsModal;