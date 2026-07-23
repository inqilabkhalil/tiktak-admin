import api from '@/shared/services/api';
import type { User } from '../types/users';

export const fetchUsers = async (): Promise<User[]> => {
  console.log('SERVICE başladı');

  const response = await api.get('/admin/users');

  console.log('API RESPONSE:', response.data);

  return response.data.data;
};
