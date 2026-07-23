import { useState } from "react";
import { useFormik } from "formik";
import { Upload, message } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";

import type {
  CategoryFormValues,
  CategoryModalProps,
} from "../../types/categories";
import { categoryValidationSchema } from "../../utils/categoryValidation";
import { uploadFile } from "@/shared/services/uploadService";

import { Modal } from "@/shared/components/Modal";
import { Input } from "@/shared/components/Input";
import { Textarea } from "@/shared/components/Textarea";
import { Button } from "@/shared/components/Button";

import styles from "./CategoryModal.module.css";
import { useCategories } from "../../hooks/useCategories";

const CategoryModal = ({
  open,
  onClose,
  mode,
  initialData,
}: CategoryModalProps) => {
  const { createCategory, updateCategory, loading } = useCategories();
  const [uploading, setUploading] = useState(false);

  const formik = useFormik<CategoryFormValues>({
    initialValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      img_url: initialData?.img_url || "",
    },
    validationSchema: categoryValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      let success = false;

      if (mode === "add") {
        success = await createCategory(values);
      } else if (initialData) {
        success = await updateCategory(initialData.id, values);
      }
      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  const getFileName = (url: string) => {
    if (!url) return "";
    return url.split("/").pop() || url;
  };

  return (
    <Modal
      title={mode === "add" ? "Yeni Kateqoriya" : "Kateqoriyanı Düzəlt"}
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
            accept="image/*"
            customRequest={async ({ file, onSuccess, onError }) => {
              try {
                setUploading(true);
                const { url } = await uploadFile(file as File);
                formik.setFieldValue("img_url", url);
                onSuccess?.(url);
              } catch (err) {
                message.error("Şəkil yüklənərkən xəta baş verdi");
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
              style={{ cursor: "pointer" }}
              suffix={uploading ? <LoadingOutlined /> : <UploadOutlined />}
            />
          </Upload>

          {formik.values.img_url && (
            <img
              src={formik.values.img_url}
              alt="preview"
              className={styles.preview}
            />
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Başlıq</label>
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched.name && formik.errors.name ? "error" : ""}
          />
          {formik.touched.name && formik.errors.name && (
            <span className={styles.error}>{formik.errors.name}</span>
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
            status={
              formik.touched.description && formik.errors.description
                ? "error"
                : ""
            }
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
          {mode === "add" ? "Məlumatları yarat" : "Məlumatları yenilə"}
        </Button>
      </form>
    </Modal>
  );
};

export default CategoryModal;
