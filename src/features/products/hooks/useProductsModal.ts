import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { message } from "antd";
import type { UploadRequestOption } from "@rc-component/upload";

import type {
  ProductFormValues,
  ProductModalProps,
  ProductUnit,
} from "../types/products";
import { productValidationSchema } from "../utils/productValidation";
import { useProductStore } from "../store/useProductStore";
import { useCategoryStore } from "@/features/categories/store/categoryStore";
import { uploadFile } from "@/shared/services/uploadService";

type UseProductsModalProps = Pick<
  ProductModalProps,
  "open" | "onClose" | "mode" | "initialData"
>;

export const useProductsModal = ({
  open,
  onClose,
  mode,
  initialData,
}: UseProductsModalProps) => {
  const { add, update, loading } = useProductStore();
  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchAll);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) fetchCategories();
  }, [open, fetchCategories]);

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData ? Number(initialData.price) : 0,
      type: initialData?.type || ("" as ProductUnit),
      category_id: initialData?.category?.id || 0,
      img_url: initialData?.img_url || "",
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

      if (mode === "add") {
        await add(payload);
      } else if (initialData) {
        await update(initialData.id, payload);
      }

      formik.resetForm();
      onClose();
    },
  });

  const getFileName = (url: string) => {
    if (!url) return "";
    return url.split("/").pop() || url;
  };

  const handleImageUpload = async ({
    file,
    onSuccess,
    onError,
  }: UploadRequestOption) => {
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
  };

  return {
    formik,
    loading,
    uploading,
    categories,
    getFileName,
    handleImageUpload,
  };
};
