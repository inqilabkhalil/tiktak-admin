import { useFormik } from "formik"
import type { CategoryFormValues, CategoryModalProps } from "../../types/categories"
import { categoryValidationSchema } from "../../utils/categoryValidation"
import { Modal } from "@/shared/components/Modal";
import styles from './CategoryModal.module.css'
import { Input } from "@/shared/components/Input";
import { Textarea } from "@/shared/components/Textarea";
import { Button } from '@/shared/components/Button';

const CategoryModal = ({
    open,
    onClose,
    mode,
    initialData
}: CategoryModalProps) => {
    const formik = useFormik<CategoryFormValues>({
        initialValues: {
            name: initialData?.name || '',
            description: initialData?.description || '',
            img_url: initialData?.img_url || '',
        },
        validationSchema: categoryValidationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            onClose();
        },
    });
  return (
    <Modal
    title={mode === 'add' ? 'Yeni koteqoriya' : 'Koteqariya Duzelt'}
    open={open}
    onCancel={onClose}
    footer={null}
    >
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.field}>
                <label className={styles.label}>Şəkil ünvanı</label>
                <Input
                name="title"
                value={formik.values.img_url}
                onChange={formik.handleChange}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Başlıq</label>
                <Input
                name="title"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.touched.name && formik.errors.name ? 'error' : ''}
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
            className={styles.submitButton}
            >
                {mode === 'add' ? 'Məlumatlari yarat' : "Məlumatlari yenilə"}
            </Button>
        </form>
    </Modal>
  )
}

export default CategoryModal