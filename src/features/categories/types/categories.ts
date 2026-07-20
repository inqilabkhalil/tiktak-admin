export interface Category {
    id: number;
    image: string;
    title: string;
    description: string;
    createdAt: string; 
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
  title: string;
  description: string;
  image: string;
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