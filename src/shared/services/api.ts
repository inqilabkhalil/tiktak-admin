import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Hər sorğuda avtomatik token əlavə edir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Token vaxtı bitəndə (401) avtomatik logout edir və login səhifəsinə yönləndirir
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/admin/login');

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      if (window.location.pathname !== '/auth') {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
