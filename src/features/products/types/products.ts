export interface ProductCategory {
  id: number;
  name: string;
}

// API-dən gələn "type" sahəsinin qəbul etdiyi həqiqi dəyərlər
export type ProductUnit = 'kg' | 'piece';

export const PRODUCT_UNIT_OPTIONS: { value: ProductUnit; label: string }[] = [
  { value: 'kg', label: 'Kiloqram' },
  { value: 'piece', label: 'Ədəd' },
];

export interface Product {
  id: number;
  title: string;
  img_url: string;
  description: string;
  price: string;
  type: ProductUnit;
  created_at: string;
  category: ProductCategory;
}

export interface ProductPayload {
  title: string;
  description: string;
  price: string;        // ✅ number | string YOX, sadəcə string
  type: ProductUnit;
  category_id: number;  // ✅ category YOX, category_id
  img_url?: string;
}


export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  add: (data: ProductPayload) => Promise<boolean>;
  update: (id: number, data: ProductPayload) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
}

//Modal
export interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: Product;
}
//Form
export interface ProductFormValues {
  title: string;
  description: string;
  price: number;
  type: ProductUnit;
  category_id: number;
  img_url: string;
}
//table
export interface GetProductColumnsProps {
  onEdit: (record: Product) => void;
  onDelete: (id: number) => void;
  getColumnSearchProps: (
    dataIndex: keyof Product,
    placeholder: string,
    getValue?: (record: Product) => string,
  ) => object;
}