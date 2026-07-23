export interface Category {
    id: number;
    name: string;
    img_url: string;
    description: string;
    createdAt: string; 
}

export interface CategoryPayload {
  name: string;
  description: string;
  img_url?: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  add: (data: CategoryPayload) => Promise<boolean>;
  update: (id: number, data: CategoryPayload) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
}
//Modal
export interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
    mode: 'add' | 'edit';
    initialData?: Category;
}
//Form 
export interface CategoryFormValues {
  name: string;
  description: string;
  img_url: string;
}
//table
export interface GetCategoryColumnsProps {
  onEdit: (record: Category) => void;
  onDelete: (id: number) => void;
  getColumnSearchProps: (
    dataIndex: keyof Category, 
    placeholder: string
  ) => object;
}