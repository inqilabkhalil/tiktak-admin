import { Modal, message } from "antd";
import { useCategoryStore } from "../store/categoryStore";
import type { CategoryPayload } from "../types/categories";

export const useCategories = () => {
  const categories = useCategoryStore((state) => state.categories);
  const loading = useCategoryStore((state) => state.loading);
  const fetchAll = useCategoryStore((state) => state.fetchAll);
  const add = useCategoryStore((state) => state.add);
  const update = useCategoryStore((state) => state.update);
  const remove = useCategoryStore((state) => state.remove);

  const createCategory = async (values: CategoryPayload) => {
    const success = await add(values);
    if (success) {
      message.success("Kateqoriya uğurla yaradıldı");
    } else {
      message.error("Kateqoriya yaradılarkən xəta baş verdi");
    }
    return success;
  };

  const updateCategory = (id: number, values: CategoryPayload) => {
    return new Promise<boolean>((resolve) => {
      Modal.confirm({
        title: "Kateqoriyanı yeniləmək istədiyinizə əminsiniz?",
        content: "Dəyişikliklər yadda saxlanılacaq.",
        okText: "Bəli, yenilə",
        cancelText: "İmtina",
        onOk: async () => {
          const success = await update(id, values);
          if (success) {
            message.success("Kateqoriya uğurla yeniləndi");
          } else {
            message.error("Kateqoriyanı yeniləmək mümkün olmadı");
          }
          resolve(success);
        },
        onCancel: () => resolve(false),
      });
    });
  };

  const deleteCategory = async (id: number) => {
    const success = await remove(id);
    if (success) {
      message.success("Kateqoriya uğurla silindi");
    } else {
      message.error("Kateqoriyanı silmək mümkün olmadı");
    }
    return success;
  };

  return {
    categories,
    loading,
    fetchAll,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};