export interface Profile {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  img_url: string;
  role: string;
  created_at: string;
}

export interface HeaderProps {
  showSearch?: boolean;
  showUserIcon?: boolean;
};
