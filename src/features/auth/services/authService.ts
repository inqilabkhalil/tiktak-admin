import api from '@/shared/services/api';
import type { LoginPayload, LoginResponse } from '../types/auth';

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post('/auth/admin/login', payload);

  return response.data.data;
};
