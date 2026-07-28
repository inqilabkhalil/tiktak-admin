import api from '@/shared/services/api';
import type { User } from '../types/users';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/admin/users');
  return response.data.data;
};
