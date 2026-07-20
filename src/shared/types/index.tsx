import type { UploadFile } from "antd/es/upload/interface";
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  setData: (data: T) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface Category {
  id: string;
  name: string;
}

export type ModalMode = "add" | "edit";
export type EditModalType = "campaign" | "category" | "product";

export interface EditModalInitialData {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  unit?: string;
  categoryId?: string;
}

export interface EditModalProps {
  open: boolean;
  mode: ModalMode;
  type: EditModalType;
  hasPriceFields?: boolean;
  initialData?: EditModalInitialData;
  categories?: Category[];
  loading?: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
}

export interface EditModalFormValues {
  title: string;
  description: string;
  price?: number;
  unit?: string;
  categoryId?: string;
  fileList: UploadFile[];
}