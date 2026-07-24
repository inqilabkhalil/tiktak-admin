export interface User {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  address: string | null;
  img_url: string | null;
  role: string;
  password: string;
  created_at: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
}
