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