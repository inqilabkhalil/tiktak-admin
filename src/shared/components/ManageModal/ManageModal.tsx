import { Modal, InputNumber, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import type { FieldProps } from "formik";
import * as Yup from "yup";

import { Input } from "@/shared/components/Input";
import { Textarea } from "@/shared/components/Textarea";
import { Button } from "@/shared/components/Button";
import { COLORS } from "@/shared/constants/colors";
import type { EditModalProps, EditModalFormValues } from "@/shared/types";
import styles from "./EditModal.module.css";

const editTitles = {
  campaign: "Kampaniyanı Redaktə Et",
  category: "Kateqoriyanı Redaktə Et",
  product: "Məhsulu Redaktə Et",
};

const validationSchema = (hasPriceFields: boolean) =>
  Yup.object({
    title: Yup.string().required("Bu sahə mütləqdir"),
    description: Yup.string(),
    price: hasPriceFields
      ? Yup.number().required("Qiymət mütləqdir").min(0)
      : Yup.number().notRequired(),
    unit: hasPriceFields ? Yup.string().required("Ölçü vahidi seçin") : Yup.string().notRequired(),
    categoryId: hasPriceFields
      ? Yup.string().required("Kateqoriya seçin")
      : Yup.string().notRequired(),
  });

export const EditModal = ({
  open,
  mode,
  type,
  hasPriceFields = false,
  initialData,
  categories,
  loading,
  onClose,
  onSubmit,
}: EditModalProps) => {
  const initialValues: EditModalFormValues = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price,
    unit: initialData?.unit,
    categoryId: initialData?.categoryId,
    fileList: initialData?.imageUrl
      ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: initialData.imageUrl,
          },
        ]
      : [],
  };

  const handleSubmit = (values: EditModalFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || "");

    if (hasPriceFields) {
      formData.append("price", String(values.price));
      formData.append("unit", values.unit || "");
      formData.append("categoryId", values.categoryId || "");
    }

    const newFile = values.fileList?.[0]?.originFileObj;
    if (newFile) {
      formData.append("image", newFile);
    }

    onSubmit(formData, initialData?.id);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema(hasPriceFields)}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue, resetForm }) => {
        const currentFile = values.fileList?.[0];
        const imageFieldText = currentFile
          ? currentFile.originFileObj
            ? currentFile.name
            : "Mövcud şəkil"
          : "Resim seçin veya buraya tıklayın";

        const imageField = (
          <>
            <label className={styles.label}>
              {type === "product" ? "Məhsul Şəkli" : "Şəkil ünvanı"}
            </label>
            <Upload
              maxCount={1}
              showUploadList={false}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFieldValue("fileList", fileList)}
              className={styles.imageUpload}
            >
              <div className={styles.uploadBox}>
                <span
                  className={
                    currentFile ? styles.uploadFileName : styles.uploadPlaceholder
                  }
                >
                  {imageFieldText}
                </span>
                <UploadOutlined className={styles.uploadIcon} />
              </div>
            </Upload>
          </>
        );

        return (
          <Modal
            open={open}
            title={mode === "edit" ? editTitles[type] : undefined}
            width={580}
            className={styles.modal}
            onCancel={() => {
              resetForm();
              onClose();
            }}
            footer={null}
            destroyOnHidden
          >
            <Form className={styles.form}>
              {!hasPriceFields && (
                <div className={styles.formGroup}>{imageField}</div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  {type === "product" ? "Məhsul Adı" : "Başlıq"}
                </label>
                <Field name="title">
                  {({ field }: FieldProps) => <Input {...field} />}
                </Field>
                {touched.title && errors.title && (
                  <p className={styles.errorText}>{errors.title}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Açıqlama</label>
                <Field name="description">
                  {({ field }: FieldProps) => (
                    <Textarea {...field} rows={4} />
                  )}
                </Field>
              </div>

              {hasPriceFields && (
                <>
                  <div className={styles.fieldsRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Qiymət</label>
                      <InputNumber
                        style={{ width: "100%" }}
                        step={0.01}
                        value={values.price}
                        onChange={(val) => setFieldValue("price", val)}
                      />
                      {touched.price && errors.price && (
                        <p className={styles.errorText}>{errors.price}</p>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Ölçü Vahidi</label>
                      <Select
                        style={{ width: "100%" }}
                        value={values.unit}
                        onChange={(val) => setFieldValue("unit", val)}
                        options={[
                          { value: "kg", label: "Kiloqram (kg)" },
                          { value: "gram", label: "Qram" },
                          { value: "eded", label: "Ədəd" },
                        ]}
                      />
                      {touched.unit && errors.unit && (
                        <p className={styles.errorText}>{errors.unit}</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.fieldsRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Kateqoriya</label>
                      <Select
                        style={{ width: "100%" }}
                        value={values.categoryId}
                        onChange={(val) => setFieldValue("categoryId", val)}
                        options={categories?.map((c) => ({ value: c.id, label: c.name }))}
                      />
                      {touched.categoryId && errors.categoryId && (
                        <p className={styles.errorText}>{errors.categoryId}</p>
                      )}
                    </div>

                    <div className={styles.formGroup}>{imageField}</div>
                  </div>
                </>
              )}

              <div className={styles.submitRow}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{
                    width: "100%",
                    backgroundColor: COLORS.mainGreen,
                    borderColor: COLORS.mainGreen,
                  }}
                >
                  {mode === "add" ? "Məlumatları yarat" : "Məlumatları Yenilə"}
                </Button>
              </div>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};
